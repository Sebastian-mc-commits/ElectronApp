import { Injectable } from '@angular/core';
import { electron } from '../../utils/functions/window.utilities';
import { WindowNamesTypes } from '../../utils/types';

@Injectable({
  providedIn: 'root'
})
export class ElectronUtilitiesService {

  constructor() { }

  openNewWindowWithArgs<T>(windowName: WindowNamesTypes, data: T) {
    electron.ipcRenderer.send("open-new-window:args", { windowName, ...data })
  }
}
