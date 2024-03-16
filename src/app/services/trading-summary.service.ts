import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
@Injectable({
  providedIn: 'root'
})
export class TradingSummaryService {

  constructor() { }

  getTransactionsSummariesByDate(isoDate: string, isoDateEnd?: string) {

    electron.ipcRenderer.send("getTransactionsSummariesByDate", { isoDate, isoDateEnd })

    electron.ipcRenderer.once("getTransactionsSummariesByDate", (e: any, data: any) => {
      console.log("data: ", data)
      console.log("e: ", e)
    })
  }

  loadCurrentTransactionSummary() {
    electron.ipcRenderer.send("getCurrentTransactionsSummaries")

    electron.ipcRenderer.once("getCurrentTransactionsSummaries", (e: any, data: any) => {
      console.log("data: ", data)
    })
  }
}
