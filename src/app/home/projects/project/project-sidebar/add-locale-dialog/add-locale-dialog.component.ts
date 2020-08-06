import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'add-locale-dialog.component.html',
})
export class AddLocaleDialogComponent implements OnInit {
  private localeAddForm: FormGroup;
  private selectDataLoading: boolean;
  private dropdownIsOpen: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.localeAddForm = this.fb.group({
      locale: ['', Validators.required],
    });
  }

  private onLanguageSearch(e: any): void {}

  private onCloseSearchBox(e: any): void {}

  private onFocusSearchBar(e: any): void {}

  private onChangeSearchBar(e: any): void {}

  private onClearSearchBar(e: any): void {}
}
