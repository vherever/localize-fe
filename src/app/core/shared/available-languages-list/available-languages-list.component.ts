import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRoles } from '../../app-constants';

interface ProjectLocale {
  name: string;
  name1: string;
  name2: string;
  flag: string;
  checked: boolean;
  code: string;
}

interface UserRoleInterface {
  name: string;
  value: string;
  active: boolean;
  description: string;
}

const userRoles: UserRoleInterface[] = [
  { value: UserRoles.TRANSLATOR, name: 'translator', active: false, description: 'allow add, edit translations.' },
  { value: UserRoles.DEVELOPER, name: 'developer', active: false, description: 'extended developer features.' },
  { value: UserRoles.MANAGER, name: 'manager', active: false, description: 'can invite and exclude team members.' },
];

@Component({
  selector: 'app-available-languages-list',
  templateUrl: 'available-languages-list.component.html',
  styleUrls: ['available-languages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableLanguagesListComponent implements OnInit {
  @Input() userProjectLocales: ProjectLocale[];
  @Input() userRole = UserRoles.TRANSLATOR;
  @Output() listChangeEventEmit: EventEmitter<any> = new EventEmitter<any>();

  private defaultValues: any;

  public languagesForm: FormGroup;
  public userRoles: UserRoleInterface[];

  constructor(
    private fb: FormBuilder,
  ) {
    this.userRoles = userRoles;
  }

  ngOnInit() {
    this.userRoles.forEach((userRole: UserRoleInterface) => {
      userRole.active = userRole.value === this.userRole;
    });
    this.languagesForm = this.fb.group({
      checkAll: [false],
      availableTranslationLocales: new FormArray([]),
      userRole: [this.userRole, [Validators.required]],
    });

    this.initCheckboxes();
    this.checkIfAllLocalesChecked();
  }

  get roleField(): FormControl {
    return this.languagesForm.get('userRole') as FormControl;
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
    this.listChangeEventEmit.emit(this.defaultValues);
  }

  public onCheckAllCheck(state: boolean): void {
    this.defaultValues.forEach((o: any) => {
      o.checked = state;
    });
    state ?
      this.languagesForm.controls.availableTranslationLocales.disable() :
      this.languagesForm.controls.availableTranslationLocales.enable();
    this.listChangeEventEmit.emit(this.defaultValues);
  }

  public onUserModelChange(userRole: UserRoleInterface): void {
    this.userRoles.forEach((role: UserRoleInterface) => {
      role.active = false;
    });
    userRole.active = true;
    this.roleField.patchValue(userRole.value);
  }
}
