import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TradingSummaryService {

  constructor() { }

  f() {
    const electron = (<any>window).require('electron');
    electron.ipcRenderer.send("fetch")

    electron.ipcRenderer.once("nice", (e: any, data: any) => {
      console.log("data: ", data)
      console.log("e: ", e)
    })
  }
}
