import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
// app imports
import { LoginService } from './login.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',  Validators.required],
    });
  }

  ngOnDestroy(): void {}

  submitForm(): any {
    this.loginService.login(this.loginForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe();
  }
}
