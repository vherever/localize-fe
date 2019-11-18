import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
// app imports
import { LoginService } from './login.service';
import { RegexpPatterns } from '../../core/helpers/regexp-patterns';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private patterns = new RegexpPatterns();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.patterns.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {}

  submitForm(): any {
    this.loginService.login(this.loginForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
