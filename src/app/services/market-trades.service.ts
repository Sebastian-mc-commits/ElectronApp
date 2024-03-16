import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
import IMarketTrade, { CurrencyType, MarketSummaryType, MarketSummaryTypeAndCurrency, Trades } from '../../utils/models/MarketTrade.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { dateInfo } from '../../utils/functions';

export type _MarketSummaryTypeAndCurrency = MarketSummaryTypeAndCurrency & {
  isSet: boolean
}

type _Trades = {
  isSet: boolean;
  trades: Trades[];
}

@Injectable({
  providedIn: 'root'
})
export class MarketTradesService {

  private _marketTrades: BehaviorSubject<_Trades>;
  private _marketTradeSummary: BehaviorSubject<_MarketSummaryTypeAndCurrency>;
  private _electron = electron
  private _renderer = this._electron.ipcRenderer

  constructor() {
    this._marketTrades = new BehaviorSubject<_Trades>({
      isSet: false,
      trades: []
    });

    this._marketTradeSummary = new BehaviorSubject<_MarketSummaryTypeAndCurrency>({
      closingPrice: 0,
      totalSize: 0,
      COP: 0,
      EURO: 0,
      isSet: false
    });
  }

  get marketTrades() {
    return this._marketTrades.asObservable();
  }

  get marketTradeSummary() {
    return this._marketTradeSummary.asObservable();
  }

  loadMarketTrades(unixDate: number, unixDateEnd?: number) {
    this._renderer.send("getMarketTradesAndCalculateClosingPrice", { unixDate, unixDateEnd })

    this._renderer.once<IMarketTrade>("getMarketTrades", (event, data) => {

      const finalTradeValue: _Trades = {
        ...this._marketTrades.value,
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
        }
        console.log("finalValue: ", finalValue)
        this._marketTradeSummary.next(finalValue)
      })
    })
  }

  loadCurrentMarketTradeInRealTime() {
    const { unixTimeInSeconds } = dateInfo(new Date())
    this.loadMarketTrades(unixTimeInSeconds)

    setInterval(() => {
      this.loadMarketTrades(unixTimeInSeconds)
    }, 60000)

  }

  changeTradeState(val: boolean) {
    this._marketTrades.value.isSet = val
  }

  changeMarketSummaryState(val: boolean) {
    this._marketTradeSummary.value.isSet = val
  }
}
