import { Component, inject } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';
import { AppLoginService } from '@services/login.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CodeInputModule, RouterModule],
})
export class AppLoginComponent {
  [x: string]: any;

  buttonDisabled = false;

  step: number = 1;

  authService = inject(AppLoginService);

  router = inject(Router);

  loginFormBuilder = inject(FormBuilder);
  mess = inject(HotToastService);

  ngOnInit(): void {
    this.loginForm = this.loginFormBuilder.group({
      username: this.loginFormBuilder.control('', Validators.minLength(3)),
      password: this.loginFormBuilder.control('', Validators.minLength(3)),
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  nextStep(step: any) {
    console.log(step);
    this.step = step;
  }

  onLogin(): void {
    this.buttonDisabled = true;
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (r) => {
        localStorage.setItem('token', JSON.stringify(r));
        this.mess.success('Вы успешно вошли в систему');
      },
      error: (e) => {
        this.buttonDisabled = false;
        this.mess.error("Введены неверные учетные данные");
      },
    });
  }
}
