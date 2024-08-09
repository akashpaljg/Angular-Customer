import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'highlight-selector',
  templateUrl: './highlight-selector.component.html',
  styleUrls: ['./highlight-selector.component.css']
})
export class HighlightSelectorComponent implements OnInit {
  private _selectors: Map<string, { isSelected: boolean, isCorrect: boolean }> | null = null;

  @Input()
  set selectors(value: Map<string, { isSelected: boolean, isCorrect: boolean }> | null) {
    this._selectors = value;
    console.log('Options received:', this._selectors);
  }

  get selectors(): Map<string, { isSelected: boolean, isCorrect: boolean }> | null {
    return this._selectors;
  }

  @Output() options: EventEmitter<Map<string, { isSelected: boolean, isCorrect: boolean }> | null > = new EventEmitter<Map<string, { isSelected: boolean, isCorrect: boolean }> | null>();

  constructor() {}

  ngOnInit(): void {
    // console.log(this._selectors);
  }

  selectorsKeys(): string[] {
    return this._selectors ? Array.from(this._selectors.keys()) : [];
  }

  toggleSelection(key: string): void {
    if (this._selectors) {
      const item = this._selectors.get(key);
      if (item) {
        item.isSelected = !item.isSelected;
        if(!item.isSelected){
            item.isCorrect = false;
        }
        this.options.emit(this._selectors);
      }
    }
  }
}
