import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
import IMarketTrade, { CurrencyType, MarketSummaryType, MarketSummaryTypeAndCurrency, Trades } from '../../utils/models/MarketTrade.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { dateInfo } from '../../utils/functions';

export type _MarketSummaryTypeAndCurrency = MarketSummaryTypeAndCurrency & {
  isSet: "YES"
}
  | {
    isSet: "NO"
  }

type _Trades = {
  isSet: "YES";
  trades: Trades[];
}
  | {
    isSet: "NO";
  }

@Injectable({
  providedIn: 'root'
})
export class MarketTradesService {

  private _marketTrades: BehaviorSubject<_Trades>;
  private _marketTradeSummary: BehaviorSubject<_MarketSummaryTypeAndCurrency>;
  private _electron = electron
  private _renderer = this._electron.ipcRenderer
  private _realTimeInterval!: any;
  // private _realTimeInterval!: NodeJS.Timeout;

  constructor() {
    this._marketTrades = new BehaviorSubject<_Trades>({
      isSet: "NO",
    });

    this._marketTradeSummary = new BehaviorSubject<_MarketSummaryTypeAndCurrency>({
      isSet: "NO"
    });
  }

  get marketTrades() {
    return this._marketTrades.asObservable();
  }

  get marketTradeSummary() {
    return this._marketTradeSummary.asObservable();
  }

  loadMarketTrades(unixDate: number, unixDateEnd?: number, limit?: number) {
    this._renderer.send("getMarketTradesAndCalculateClosingPrice", { unixDate, unixDateEnd, limit })

    this._renderer.once<IMarketTrade>("getMarketTrades", (event, data) => {

      const finalTradeValue: _Trades = {
        isSet: "YES",
        trades: data.response.trades
      }

      this._marketTrades.next(finalTradeValue)
    })

    this._renderer.once<MarketSummaryType>("getMarketTradesAndCalculateClosingPrice", (e, data) => {

      this._renderer.send("USD-converter", data.response.closingPrice)
      this._renderer.once<CurrencyType>("USD-converter", (e, currency) => {

        const finalValue: _MarketSummaryTypeAndCurrency = {
          ...this._marketTradeSummary.value,
          ...data.response,
          ...currency.response,
          isSet: "YES"
        }
        this._marketTradeSummary.next(finalValue)
      })
    })
  }

  loadCurrentMarketTradeInRealTime(limit: number) {
    const { unixTimeInSeconds } = dateInfo(new Date())
    this.loadMarketTrades(unixTimeInSeconds, undefined, limit)

    this._realTimeInterval = setInterval(() => {
      this.loadMarketTrades(unixTimeInSeconds, undefined, limit)
    }, 6000 * 10)

  }

  stopRealTimeUpdates() {
    if (this._realTimeInterval) {
      clearInterval(this._realTimeInterval)
    }
  }
}
