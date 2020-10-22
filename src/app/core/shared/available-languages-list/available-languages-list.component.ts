import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface ProjectLocale {
  name: string;
  name1: string;
  name2: string;
  flag: string;
  checked: boolean;
  code: string;
}

@Component({
  selector: 'app-available-languages-list',
  templateUrl: 'available-languages-list.component.html',
  styleUrls: ['available-languages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableLanguagesListComponent implements OnInit {
  @Input() userProjectLocales: ProjectLocale[];
  @Output() listChangeEventEmit: EventEmitter<any> = new EventEmitter<any>();

  private defaultValues: any;

  public languagesForm: FormGroup;
  // public checkAll: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.languagesForm = this.fb.group({
      checkAll: [false],
      availableTranslationLocales: new FormArray([]),
    });

    this.initCheckboxes();
    this.checkIfAllLocalesChecked();
  }

  private get availableTranslationLocalesControl(): FormControl {
    return this.languagesForm.controls.availableTranslationLocales as FormControl;
  }

  private initCheckboxes(): void {
    this.userProjectLocales.forEach((o) => {
      const control = new FormControl(o);
      (this.languagesForm.controls.availableTranslationLocales as FormArray).push(control);
    });
    this.defaultValues = this.availableTranslationLocalesControl.value;
  }

  private checkIfAllLocalesChecked(): void {
    const isCheckedAll = this.defaultValues.every((value, index, array) => value.checked);
    if (isCheckedAll) {
      this.languagesForm.controls.checkAll.patchValue(true);
      this.availableTranslationLocalesControl.disable();
    }
  }

  public onCheckboxChange(control: { checked: boolean, code: string }, state: boolean): void {
    control.checked = state;
    this.listChangeEventEmit.emit(this.availableTranslationLocalesControl.value);
  }

  public onCheckAllCheck(state: boolean): void {
    this.defaultValues.forEach((o: any) => {
      o.checked = state;
    });
    state ?
      this.languagesForm.controls.availableTranslationLocales.disable() :
      this.languagesForm.controls.availableTranslationLocales.enable();
    this.listChangeEventEmit.emit(this.availableTranslationLocalesControl.value);
  }
}
