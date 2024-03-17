import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MarketTradesService, _MarketSummaryTypeAndCurrency } from '../../services/market-trades.service';
import { ActivatedRoute } from '@angular/router';
import { MarketTradeRendererComponent } from '../../components/market-trade-renderer/market-trade-renderer.component';
import { Trades } from '../../../utils/models/MarketTrade.model';
import { startWith } from 'rxjs';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';

export type MarketTradeViewerType = {
  start: number,
  end: number
}

@Component({
  selector: 'app-market-trade-viewer',
  standalone: true,
  imports: [MarketTradeRendererComponent, LeftPanelComponent],
  templateUrl: './market-trade-viewer.component.html',
  styleUrl: './market-trade-viewer.component.css'
})
export class MarketTradeViewerComponent implements OnInit {


  constructor(
    public _marketTradesService: MarketTradesService,
    private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) { }

  trades: Trades[] = []
  closingPriceInfo: _MarketSummaryTypeAndCurrency = {
    isSet: false,
    closingPrice: 0,
    COP: 0,
    EURO: 0,
    totalSize: 0
  }
  isPanelActive = false
  ngOnInit(): void {

    this._marketTradesService
      .marketTrades
      .pipe(startWith(null))
      .subscribe(data => {

        if (data === null) return

        if (!data.isSet) {
          this.trades = data.trades
          this._marketTradesService.changeTradeState(data.trades.length > 0)
          this._cdr.detectChanges()
        }

      })

    this._marketTradesService
      .marketTradeSummary
      .pipe(startWith(null))
      .subscribe(data => {

        console.log("1, ", data)
        if (data === null || data?.closingPrice <= 0) return

        if (!data.isSet) {
          this.closingPriceInfo = data
          this._marketTradesService.changeMarketSummaryState(true)
          this._cdr.detectChanges()
        }

      })

    this.route.params.subscribe(({ start, end }) => {

      if (!start || !end) return
      this._marketTradesService.loadMarketTrades(+start, +end)
    })

  }

  openPanel () {
    this.isPanelActive = true
  }
}
