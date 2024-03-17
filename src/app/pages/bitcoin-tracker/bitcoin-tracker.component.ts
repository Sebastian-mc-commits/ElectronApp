import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BitcoinsDateInfoComponent } from '../../components/bitcoins-date-info/bitcoins-date-info.component';
import { MarketTradesService, _MarketSummaryTypeAndCurrency } from '../../services/market-trades.service';
import { TradingSummaryService, _ITransactionSummary } from '../../services/trading-summary.service';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { Subscription, take } from 'rxjs';
import { TransactionSummaryComponent } from '../../components/transaction-summary/transaction-summary.component';

@Component({
  selector: 'app-bitcoin-tracker',
  standalone: true,
  imports: [BitcoinsDateInfoComponent, LeftPanelComponent, TransactionSummaryComponent],
  templateUrl: './bitcoin-tracker.component.html',
  styleUrl: './bitcoin-tracker.component.css'
})
export class BitcoinTrackerComponent implements OnInit, OnDestroy {

  marketTradeSummary: _MarketSummaryTypeAndCurrency = {
    isSet: "NO",
  }

  transactionSummary: _ITransactionSummary = {
    isSet: "NO"
  }

  private _marketTradesSubscription!: Subscription

  panelActive = false

  constructor(
    private _marketTradesService: MarketTradesService,
    private _cdr: ChangeDetectorRef,
    private _tradingSummaryService: TradingSummaryService
  ) { }

  ngOnInit() {

    this._marketTradesSubscription = this._marketTradesService.marketTradeSummary.subscribe(data => {

      this.marketTradeSummary = data
      if (data.isSet === "YES") {
        this._cdr.detectChanges()
      }
    })

    this._tradingSummaryService.transactionSummary
      .pipe(take(2))
      .subscribe(data => {

        if (data?.isSet === "NO") return

        this.transactionSummary = data
        this._cdr.detectChanges()
      })

    this._marketTradesService.loadCurrentMarketTradeInRealTime(0)
  }

  ngOnDestroy(): void {
    this._marketTradesSubscription.unsubscribe()
    this._marketTradesService.stopRealTimeUpdates()
  }

  activePanel() {
    this._tradingSummaryService.loadCurrentTransactionSummary()
    this.panelActive = !this.panelActive
  }

}