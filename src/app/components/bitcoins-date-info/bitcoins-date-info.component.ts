import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BitcoinDateInfoComponent } from '../bitcoin-date-info/bitcoin-date-info.component';
import { getPreviousDaysFromCurrentDate } from '../../../utils/functions';
import { DateData } from '../../../utils/models/Date.model';

@Component({
  selector: 'app-bitcoins-date-info',
  standalone: true,
  imports: [CommonModule, BitcoinDateInfoComponent],
  templateUrl: './bitcoins-date-info.component.html',
  styleUrl: './bitcoins-date-info.component.css'
})
export class BitcoinsDateInfoComponent {

  dates: DateData[]

  constructor() {
    this.dates = getPreviousDaysFromCurrentDate(14)
    console.log("dates: ", getPreviousDaysFromCurrentDate(14))
  }
}
