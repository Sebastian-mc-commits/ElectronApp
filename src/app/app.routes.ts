import { Routes } from '@angular/router';
import { BitcoinTrackerComponent } from './pages/bitcoin-tracker/bitcoin-tracker.component';
import { MarketTradeViewerComponent } from './pages/market-trade-viewer/market-trade-viewer.component';
import { validDataGuard } from './guards/valid-data.guard';

export const routes: Routes = [
    {
        path: "marketTradeViewer/:start/:end/:formattedDate",
        component: MarketTradeViewerComponent
    },
    {
        path: "",
        component: BitcoinTrackerComponent, canActivate: [
            validDataGuard
        ]
    },

];
