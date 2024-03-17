import { CanActivateFn, Router } from '@angular/router';
import { electron } from '../../utils/functions/window.utilities';
import { WindowParamsEvent } from '../../utils/types';
import { MarketTradeViewerType } from '../pages/market-trade-viewer/market-trade-viewer.component';
import { inject } from '@angular/core';

export const validDataGuard: CanActivateFn = async (route, state): Promise<boolean> => {

  return true
  const router = inject(Router)

  return await new Promise(resolve => {
    let replaceRoute = false
    electron.ipcRenderer.once<WindowParamsEvent<MarketTradeViewerType>>("on-open-window", (e, params) => {

      const { response: { windowName, end, start } } = params;

      replaceRoute = true
      router.navigate([windowName, start, end])
    })

    setTimeout(() => {
      resolve(!replaceRoute)
    }, 1000)
  })

};
