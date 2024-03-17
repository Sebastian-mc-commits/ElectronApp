import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BitcoinsDateInfoComponent } from '../../components/bitcoins-date-info/bitcoins-date-info.component';
import { MarketTradesService, _MarketSummaryTypeAndCurrency } from '../../services/market-trades.service';

@Component({
  selector: 'app-bitcoin-tracker',
  standalone: true,
  imports: [BitcoinsDateInfoComponent],
  templateUrl: './bitcoin-tracker.component.html',
  styleUrl: './bitcoin-tracker.component.css'
})
export class BitcoinTrackerComponent implements OnInit {

  marketTradeSummary: _MarketSummaryTypeAndCurrency = {
    closingPrice: 0,
    COP: 0,
    EURO: 0,
    isSet: false,
    totalSize: 0
  }

  constructor(private _marketTradesService: MarketTradesService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._marketTradesService.marketTradeSummary.subscribe(data => {

      this.marketTradeSummary = data
      if (!data.isSet) {
        this._marketTradesService.changeMarketSummaryState(true)
        this._cdr.detectChanges()
      }
    })

    this._marketTradesService.loadCurrentMarketTradeInRealTime()
  }
}