import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import { RegexpPatterns } from '../../core/helpers/regexp-patterns';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private patterns = new RegexpPatterns();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.patterns.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.patterns.passwordPattern)]],
      repeat_password: ['', [Validators.required, Validators.pattern(this.patterns.passwordPattern)]],
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
