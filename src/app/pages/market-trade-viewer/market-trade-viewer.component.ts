import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MarketTradesService, _MarketSummaryTypeAndCurrency } from '../../services/market-trades.service';
import { ActivatedRoute } from '@angular/router';
import { MarketTradeRendererComponent } from '../../components/market-trade-renderer/market-trade-renderer.component';
import { Trades } from '../../../utils/models/MarketTrade.model';
import { Subscription, startWith } from 'rxjs';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { CustomLoaderComponent } from '../../components/custom-loader/custom-loader.component';

export type MarketTradeViewerType = {
  start: number;
  end: number;
  formattedDate: string;
}

@Component({
  selector: 'app-market-trade-viewer',
  standalone: true,
  imports: [MarketTradeRendererComponent, LeftPanelComponent, CustomLoaderComponent],
  templateUrl: './market-trade-viewer.component.html',
  styleUrl: './market-trade-viewer.component.css'
})
export class MarketTradeViewerComponent implements OnInit, OnDestroy {


  private _marketTradesSubscription!: Subscription
  private _marketTradeSummarySubscription!: Subscription;
  private _startParam!: number
  private _endParam!: number
  private _formattedDateParam!: string

  constructor(
    public _marketTradesService: MarketTradesService,
    private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) { }

  trades: Trades[] = []
  // transactionSummary!: ITransactionSummary
  closingPriceInfo: _MarketSummaryTypeAndCurrency = {
    isSet: "NO",
  }
  isPanelActive = false
  ngOnInit(): void {

    this._marketTradesSubscription = this._marketTradesService
      .marketTrades
      .pipe(startWith(null))
      .subscribe(data => {

        if (data === null || data.isSet === "NO") return

        this.trades = data.trades
        this._cdr.detectChanges()
      })

    this._marketTradeSummarySubscription = this._marketTradesService
      .marketTradeSummary
      .pipe(startWith(null))
      .subscribe(data => {

        if (data === null || data.isSet === "NO") return

        this.closingPriceInfo = data
        this._cdr.detectChanges()

      })

    this.route.params.subscribe(({ start, end, formattedDate }) => {

      if (!start || !end || !formattedDate) return

      this._endParam = +end
      this._startParam = +start
      this._formattedDateParam = formattedDate.toString()
      this._marketTradesService.loadMarketTrades({
        isSet: "NO",
        unixDate: +start,
        unixDateEnd: +end,
        formattedDate
      })
    })

  }

  ngOnDestroy(): void {
    this._marketTradeSummarySubscription.unsubscribe()
    this._marketTradesSubscription.unsubscribe()
  }

  openPanel() {
    this.isPanelActive = !this.isPanelActive
  }

  onSelectValue(val: Event) {
    if (val.target !== null && "value" in val.target) {
      const value = val.target["value"] as string
      const limit = value === "all" ? 0 : parseInt(value)

      this._marketTradesService.loadMarketTrades({
        isSet: "YES",
        unixDate: this._startParam,
        unixDateEnd: this._endParam,
        formattedDate: this._formattedDateParam,
        limit,
        removeCache: false,
        replaceCache: false,
        setOnce: true
      })
    }
  }
}
