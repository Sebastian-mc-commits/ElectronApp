import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BitcoinDateInfoComponent } from '../bitcoin-date-info/bitcoin-date-info.component';
import { getPreviousDaysFromCurrentDate } from '../../../utils/functions';
import { DateData } from '../../../utils/models/Date.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-bitcoins-date-info',
  standalone: true,
  imports: [CommonModule, BitcoinDateInfoComponent, CardComponent],
  templateUrl: './bitcoins-date-info.component.html',
  styleUrl: './bitcoins-date-info.component.css'
})
export class BitcoinsDateInfoComponent implements OnInit {

  dates!: DateData[];
  @Input() weekNumber!: number;

  ngOnInit(): void {
    const startDay = this.weekNumber <= 1 ? 1 : this.weekNumber * 7
    this.dates = getPreviousDaysFromCurrentDate(startDay, startDay + 6)
  }
}
