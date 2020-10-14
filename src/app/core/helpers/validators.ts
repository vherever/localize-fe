import { FormControl } from '@angular/forms';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

export function matchOtherValidator(otherControlName: string) {

  let thisControl: FormControl;
  let otherControl: FormControl;

  return function matchOtherValidate(control: FormControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges
        .pipe(untilComponentDestroyed(this))
        .subscribe(() => {
          thisControl.updateValueAndValidity();
        });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        notMatched: true,
      };
    }
  };
}
