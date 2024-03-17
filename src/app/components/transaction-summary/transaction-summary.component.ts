import { Component, Input } from '@angular/core';
import { _ITransactionSummary } from '../../services/trading-summary.service';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.css'
})
export class TransactionSummaryComponent {

  @Input() transactionSummary!: _ITransactionSummary
}
