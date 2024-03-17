import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent implements OnChanges {

  @Input() panelActive = true
  @Input() title = ""
  togglePanel() {
    this.panelActive = !this.panelActive
  }

  closePanel() {
    this.panelActive = false
  }

  openPanel() {
    this.panelActive = true
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ("panelActive" in changes) {
      this.panelActive = changes['panelActive'].currentValue
    }
  }
}
