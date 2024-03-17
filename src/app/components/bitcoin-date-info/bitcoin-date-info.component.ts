import { Component, Input } from '@angular/core';
import { DateData } from '../../../utils/models/Date.model';
import { dateSetter } from '../../../utils/functions';
import { ElectronUtilitiesService } from '../../services/electron-utilities.service';
import { MarketTradeViewerType } from '../../pages/market-trade-viewer/market-trade-viewer.component';
import { Router } from '@angular/router';

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

  constructor(public _electronUtilities: ElectronUtilitiesService, public ro: Router) {
    this.isSelected = false
  }

  onPress() {
    this.isSelected = !this.isSelected


    if (this.isSelected) {
      const { unixTimeInSeconds, inputDate } = this.dateInfo

      this.ro.navigate(["/marketTradeViewer", dateSetter(inputDate, -1).unixTimeInSeconds, unixTimeInSeconds])
      // this._electronUtilities.openNewWindowWithArgs<MarketTradeViewerType>("/marketTradeViewer",
      //   {
      //     start: dateSetter(inputDate, -1).unixTimeInSeconds,
      //     end: unixTimeInSeconds
      //   }
      // )
    }
  }
}
