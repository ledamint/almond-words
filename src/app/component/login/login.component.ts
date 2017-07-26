import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthorizationService }  from '../../service/authorization.service';

@Component({
  selector: 'login',
  template: `
          <h1>Login</h1>
          <form class="form" #loginForm="ngForm" action="" method="post" (ngSubmit)="checkLogin(loginForm)">
            <input class="text-input" type="text" name="email" placeholder="email" ngModel required>
            <input class="text-input" type="password" name="password" placeholder="password" ngModel required>
            <button class="button" type="submit" [disabled]="!loginForm.valid">Submit</button>
          </form>`,
  styleUrls: ['./login.component.scss']
})
export class Login {
  constructor(private authorizationService: AuthorizationService) { }

  checkLogin(form: NgForm) {
    const userData = {
      email: form.value.email,
      password: form.value.password
    }

    this.authorizationService.checkLogin(userData);
  }
}