import { Component, Input } from '@angular/core';

type CardComponentValues = {
  cardTitle: string;
  cardDescription?: string;
}
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  isExpanded = false;
  cardClass = ""
  @Input() cardValues!: CardComponentValues;

  toggleExpand () {
    this.isExpanded = !this.isExpanded;
  }

  unExpand () {
    this.isExpanded = false;
  }

}
