import { Routes } from '@angular/router';
import { ExampleComponent } from './pages/example/example.component';
import { BitcoinTrackerComponent } from './pages/bitcoin-tracker/bitcoin-tracker.component';
import { MarketTradeViewerComponent } from './pages/market-trade-viewer/market-trade-viewer.component';
import { validDataGuard } from './guards/valid-data.guard';

export const routes: Routes = [
    {
        path: "example",
        component: ExampleComponent
    },
    {
        path: "marketTradeViewer/:start/:end",
        component: MarketTradeViewerComponent
    },
    {
        path: "",
        component: BitcoinTrackerComponent, canActivate: [
            validDataGuard
        ]
    },

];
