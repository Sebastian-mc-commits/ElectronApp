import { Component, Input } from '@angular/core';
import { DateData } from '../../../utils/models/Date.model';
import { TradingSummaryService } from '../../services/trading-summary.service';

@Component({
  selector: 'app-bitcoin-date-info',
  standalone: true,
  imports: [],
  templateUrl: './bitcoin-date-info.component.html',
  styleUrl: './bitcoin-date-info.component.css'
})
export class BitcoinDateInfoComponent {

  @Input() dateInfo!: DateData
  isSelected: boolean

  constructor(private _tradingSummaryService: TradingSummaryService) {
    this.isSelected = false
  }

  onPress() {
    this.isSelected = !this.isSelected

    console.log("Render to a new View: ", this.dateInfo)

    if (this.isSelected) {
      const { isoDate } = this.dateInfo
      this._tradingSummaryService.getTransactionsSummariesByDate(isoDate, isoDate)
    }
  }
}
