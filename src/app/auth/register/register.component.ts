import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import { RegexpPatterns } from '../../core/helpers/regexp-patterns';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { matchOtherValidator } from '../../core/helpers/validators';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private patterns = new RegexpPatterns();

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
  ) {}

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

  ngOnDestroy() {}

  submitForm(): any {
    this.registerService.register(this.registerForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
  }
}
