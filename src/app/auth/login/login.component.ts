import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { LoginService } from './login.service';
import { RegexpPatterns } from '../../core/helpers/regexp-patterns';
import { ErrorModel } from '../../core/models/error.model';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private patterns = new RegexpPatterns();

  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private pubSubService: NgxPubSubService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.patterns.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
  }

  submitForm(): any {
    this.isLoading = true;
    this.loginService.login(this.loginForm.value)
      .pipe(
        // @ts-ignore
        catchError((error: ErrorModel) => {
          this.isLoading = false;
          this.snackBar.open(
            `${error.error}. ${error.message}`,
            'Okay',
            { duration: 5000 },
          );
          return false;
        }),
        untilComponentDestroyed(this),
      )
      .subscribe(() => {
        this.isLoading = false;
        this.pubSubService.publishEvent('isAuthenticated', true);
      });
  }
}
