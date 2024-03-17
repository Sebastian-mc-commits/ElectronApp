import { Component, Input } from '@angular/core';
import { Trades } from '../../../utils/models/MarketTrade.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-trade-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-trade-renderer.component.html',
  styleUrl: './market-trade-renderer.component.css'
})
export class MarketTradeRendererComponent {

  @Input() data: Trades[] = [];
}
