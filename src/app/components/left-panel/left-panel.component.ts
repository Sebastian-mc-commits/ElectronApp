import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {

  @Input() isActive = true
  @Input() title = ""
  togglePanel() {
    this.isActive = !this.isActive
  }

  closePanel() {
    this.isActive = false
  }

  openPanel() {
    this.isActive = true
  }
}
