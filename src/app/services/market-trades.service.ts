import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
import IMarketTrade, { CurrencyType, MarketSummaryType, MarketSummaryTypeAndCurrency, Trades } from '../../utils/models/MarketTrade.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { dateInfo } from '../../utils/functions';
import { InfoElectronType } from '../../utils/models/Window.model';

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

type MarketTradesParamTypes = InfoElectronType<{
  unixDate: number;
  unixDateEnd?: number;
  limit?: number;
  formattedDate: string;
}>

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

  loadMarketTrades(data: MarketTradesParamTypes) {
    this._renderer.send("getMarketTradesAndCalculateClosingPrice", data)

    this._renderer.once<IMarketTrade>("getMarketTrades", (event, data) => {

      const finalTradeValue: _Trades = {
        isSet: "YES",
        trades: data.response?.trades || []
      }

      this._marketTrades.next(finalTradeValue)
    })

    this._renderer.once<MarketSummaryType>("getMarketTradesAndCalculateClosingPrice", (e, closingPrice) => {

      const { unixDate, limit, unixDateEnd, ...dataParams } = data

      this._renderer.send<MarketSummaryType>("USD-converter", {
        ...closingPrice.response,
        closingPrice: closingPrice.response.finalPrice.price as number,
        ...dataParams
      })

      this._renderer.once<CurrencyType>("USD-converter", (e, currency) => {

        const finalValue: _MarketSummaryTypeAndCurrency = {
          ...this._marketTradeSummary.value,
          ...closingPrice.response,
          ...currency.response,
          isSet: "YES"
        }

        this._marketTradeSummary.next(finalValue)
      })
    })
  }

  loadCurrentMarketTradeInRealTime(limit: number, removeCache = false) {
    const { unixTimeInSeconds, formattedDate } = dateInfo(new Date())
    this.loadMarketTrades({
      isSet: "YES",
      removeCache,
      replaceCache: true,
      unixDate: unixTimeInSeconds,
      limit,
      formattedDate,
      setOnce: false
    })

    this._realTimeInterval = setInterval(() => {
      this.loadMarketTrades({
        isSet: "YES",
        removeCache,
        replaceCache: true,
        unixDate: unixTimeInSeconds,
        limit,
        formattedDate,
        setOnce: false
      })
    }, 60000)

  }

  stopRealTimeUpdates() {
    if (this._realTimeInterval) {
      clearInterval(this._realTimeInterval)
    }
  }
}
