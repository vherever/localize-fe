import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
// app imports
import { LoginService } from './login.service';
import { RegexpPatterns } from '../../core/helpers/regexp-patterns';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { ErrorModel } from '../../core/models/error.model';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private patterns = new RegexpPatterns();

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.patterns.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {}

  submitForm(): any {
    this.loginService.login(this.loginForm.value)
      .pipe(
        // @ts-ignore
        catchError((error: ErrorModel) => {
          this.snackBar.open(
            `${error.error}. ${error.message}`,
            'Okay',
            { duration: 5000 }
            );
          return error;
        }),
        untilComponentDestroyed(this)
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
