import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BitcoinsDateInfoComponent } from './components/bitcoins-date-info/bitcoins-date-info.component';
import { TradingSummaryService } from './services/trading-summary.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BitcoinsDateInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'electron-app';
  constructor(private tradingSummaryService: TradingSummaryService) {

  }

  ngOnInit(): void {
    // this.tradingSummaryService.getTransactionsSummariesByDate()
  }
}
