import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

interface SelectInterface {
  id: number;
  text: string;
  value: string;
  htmlTemplate?: string;
}

@Component({
  selector: 'app-lc-select',
  templateUrl: 'lc-select.component.html',
})
export class LcSelectComponent implements OnInit, OnChanges {
  @Input() currentKey: string;
  @Input() selectData: SelectInterface[];
  @Input() selectWidthClass: string;
  @Input() dropdownWidthClass: string;

  @Output() onOptionSelectEmit: EventEmitter<string> = new EventEmitter<string>();

  public selectIsOpened: boolean;
  public selectedOption: string;
  public currentTextValue: string;
  public currentHtmlTemplate: string;
  public selectWidthClass_: string;
  public dropdownWidthClass_: string;

  ngOnInit() {
    this.selectWidthClass_ = this.dropdownWidthClass || 'w-full';
    this.dropdownWidthClass_ = this.dropdownWidthClass || 'w-full';
  }

  ngOnChanges() {
    this.selectedOption = this.currentKey;
    if (!Array.isArray(this.selectData)) {
      console.error('selectData should be array.');
      return false;
    }
    const foundOption = this.selectData.find((o) => o.value === this.selectedOption);
    this.currentTextValue = foundOption ? foundOption.text : '';
    this.currentHtmlTemplate = foundOption && foundOption.htmlTemplate ? foundOption.htmlTemplate : '';
  }

  public openSelectClick(): void {
    this.selectIsOpened = !this.selectIsOpened;
  }

  public onClickedOutside(): void {
    this.selectIsOpened = false;
  }

  public onOptionSelected(key: string): void {
    this.selectedOption = key;
    const found = this.selectData.find((o) => o.value === key);
    this.currentTextValue = found.text;
    this.currentHtmlTemplate = found.htmlTemplate;
    this.onOptionSelectEmit.emit(key);
  }
}
