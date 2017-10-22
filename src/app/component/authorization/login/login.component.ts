import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';

import { AuthorizationService } from 'app/service/authorization.service';

import { LoginData } from 'app/service/interface/interfaces';

@Component({
  selector: 'login',
  template: `
          <h1>Login</h1>
          <form class="form" #loginForm="ngForm" action="" method="post" (ngSubmit)="checkLogin(loginForm)">
              <h4 class="input-title">email</h4>
              <input class="text-input" type="email" name="email" focus="true" ngModel email required>
              <h4 class="input-title">password</h4>
              <input class="text-input" type="password" name="password" ngModel required>
              <button class="button" type="submit" [disabled]="!loginForm.valid">Log in</button>
          </form>
          <div class="side-panel">
              <a routerLink="/registration" class="side-panel__item">registration</a>
              <a routerLink="/password-recovery" class="side-panel__item">password recovery</a>
          </div>`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authorizationService: AuthorizationService) { }

  checkLogin(loginForm: NgForm) {
    const email: string = loginForm.value.email.trim().toLowerCase();

    const loginData: LoginData = {
      email: email,
      password: loginForm.value.password
    };

    this.authorizationService.checkLogin(loginData);
  }
}
