import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
import { BehaviorSubject } from 'rxjs';
import ITransactionSummary from '../../utils/models/TransactionSummary.model';

export type _ITransactionSummary = ITransactionSummary & {
  isSet: "YES";
}
  |
{ isSet: "NO"; }

@Injectable({
  providedIn: 'root'
})
export class TradingSummaryService {


  private _transactionSummary: BehaviorSubject<_ITransactionSummary>
  constructor() {
    this._transactionSummary = new BehaviorSubject<_ITransactionSummary>({
      isSet: "NO"
    })
  }

  get transactionSummary() {
    return this._transactionSummary.asObservable()
  }

  getTransactionsSummariesByDate(isoDate: string, isoDateEnd?: string) {

    electron.ipcRenderer.send("getTransactionsSummariesByDate", { isoDate, isoDateEnd })

    electron.ipcRenderer.once<_ITransactionSummary>("getTransactionsSummariesByDate", (e, data) => {

      data.response.isSet = "YES"
      this._transactionSummary.next(data.response)
    })
  }

  loadCurrentTransactionSummary() {
    electron.ipcRenderer.send("getCurrentTransactionsSummaries")

    electron.ipcRenderer.once<_ITransactionSummary>("getCurrentTransactionsSummaries", (e, data) => {
      data.response.isSet = "YES"
      this._transactionSummary.next(data.response)
    })
  }
}
