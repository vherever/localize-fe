import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { RegexpPatterns } from '../../core/helpers/regexp-patterns';
import { RegisterService } from '../../core/services/api-interaction/register.service';
import { matchOtherValidator } from '../../core/helpers/validators';
import { ErrorModel } from '../../core/models/error.model';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private patterns = new RegexpPatterns();

  registerForm: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.patterns.emailPattern),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.patterns.passwordPattern),
      ]],
      confirm_password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.patterns.passwordPattern),
        matchOtherValidator('password'),
      ]],
    });
  }

  ngOnDestroy() {
  }

  submitForm(): any {
    this.isLoading = true;
    this.registerService.register(this.registerForm.value)
      .pipe(
        // @ts-ignore
        catchError((error: ErrorModel) => {
          this.isLoading = false;
          this.snackBar.open(
            `${error}`,
            'Okay',
            { duration: 5000 },
          );
          return false;
        }),
        untilComponentDestroyed(this),
      )
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      });
  }
}
