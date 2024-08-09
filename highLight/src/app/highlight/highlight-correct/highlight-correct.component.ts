import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'highlight-correct',
  templateUrl: './highlight-correct.component.html',
  styleUrls: ['./highlight-correct.component.css']
})
export class HighlightCorrectComponent implements OnInit {
  private _selectors: Map<string, { isSelected: boolean, isCorrect: boolean }> | null = null;

  @Input()
  set selectors(value: Map<string, { isSelected: boolean, isCorrect: boolean }> | null) {
    this._selectors = value;
    console.log('Options received:', this._selectors);
  }

  get selectors(): Map<string, { isSelected: boolean, isCorrect: boolean }> | null {
    return this._selectors;
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this._selectors);
  }

  selectorsKeys(): string[] {
    return this._selectors ? Array.from(this._selectors.keys()) : [];
  }

  toggleSelection(key: string): void {
    if (this._selectors) {
      const item = this._selectors.get(key);
      if (item && item.isSelected) {
        item.isCorrect = !item.isCorrect;
        item.isSelected = item.isCorrect;
        // Optionally, perform other actions when the item is toggled
      }
    }
  }
}
