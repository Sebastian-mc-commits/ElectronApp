import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BitcoinsDateInfoComponent } from './components/bitcoins-date-info/bitcoins-date-info.component';
import { electron } from '../utils/functions/window.utilities';
import { WindowParamsEvent } from '../utils/types';
import { MarketTradeViewerType } from './pages/market-trade-viewer/market-trade-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BitcoinsDateInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'electron-app';
  constructor(private router: Router) {

  }

  ngOnInit(): void {

    
  }

}
