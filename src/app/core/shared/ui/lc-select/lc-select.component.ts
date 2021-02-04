import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

interface SelectInterface {
  id: number;
  text: string;
  value: string;
}

@Component({
  selector: 'app-lc-select',
  templateUrl: 'lc-select.component.html',
})
export class LcSelectComponent implements OnChanges {
  @Input() currentKey: string;
  @Input() selectData: SelectInterface[];
  @Input() selectWidthClass: string;
  @Input() dropdownWidthClass: string;

  @Output() onOptionSelectEmit: EventEmitter<string> = new EventEmitter<string>();

  public selectIsOpened: boolean;
  public selectedOption: string;
  public currentTextValue: string;

  ngOnChanges() {
    this.selectedOption = this.currentKey;
    const foundOption = this.selectData.find((o) => o.value === this.selectedOption);
    this.currentTextValue = foundOption ? foundOption.text : '';
  }

  public openSelectClick(): void {
    this.selectIsOpened = !this.selectIsOpened;
  }

  public onClickedOutside(): void {
    this.selectIsOpened = false;
  }

  public onOptionSelected(key: string): void {
    this.selectedOption = key;
    this.currentTextValue = this.selectData.find((o) => o.value === key).text;
    this.onOptionSelectEmit.emit(key);
  }
}
