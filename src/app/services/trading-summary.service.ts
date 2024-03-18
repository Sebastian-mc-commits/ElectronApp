import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
import { BehaviorSubject } from 'rxjs';
import ITransactionSummary from '../../utils/models/TransactionSummary.model';
import { dateInfo } from '../../utils/functions';

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

  getTransactionsSummariesByDate(isoDate: string, formattedDate: string, isoDateEnd?: string) {

    electron.ipcRenderer.send("getTransactionsSummariesByDate", { isoDate, isoDateEnd, isSet: "NO", formattedDate })

    electron.ipcRenderer.once<_ITransactionSummary>("getTransactionsSummariesByDate", (e, data) => {

      data.response.isSet = "YES"
      this._transactionSummary.next(data.response)
    })
  }

  loadCurrentTransactionSummary() {
    const { formattedDate } = dateInfo(new Date())
    electron.ipcRenderer.send("getCurrentTransactionsSummaries", { isSet: "NO", formattedDate })

    electron.ipcRenderer.once<_ITransactionSummary>("getCurrentTransactionsSummaries", (e, data) => {
      data.response.isSet = "YES"
      this._transactionSummary.next(data.response)
    })
  }
}
