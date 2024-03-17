import { CanActivateFn, Router } from '@angular/router';
import { electron } from '../../utils/functions/window.utilities';
import { WindowParamsEvent } from '../../utils/types';
import { MarketTradeViewerType } from '../pages/market-trade-viewer/market-trade-viewer.component';
import { inject } from '@angular/core';

export const validDataGuard: CanActivateFn = (route, state): boolean => {

  const router = inject(Router)
  let replaceRoute = false
  electron.ipcRenderer.once<WindowParamsEvent<MarketTradeViewerType>>("on-open-window", (e, params) => {

    const { response: { windowName, end, start } } = params;

    replaceRoute = true
    router.navigate([windowName, +start, +end])
  })

  return !replaceRoute

};
