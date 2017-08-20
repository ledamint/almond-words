import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizationService } from 'app/service/authorization.service';

@Component({
  selector: 'forget-password',
  template: `
          <h1>Forget password</h1>
          <form class="form" #forgetPasswordForm="ngForm" action="" method="post"
            (ngSubmit)="sendNewPassword(forgetPasswordForm.value.email)">
              <h4 class="input-title">email</h4>
              <input class="text-input" type="email" name="email" focus="true" ngModel email required>
              <button class="button" type="submit" [disabled]="!forgetPasswordForm.valid">Send new password</button>
          </form>
          <div class="side-panel">
              <a routerLink="/login" routerLinkActive="active" class="side-panel__item">login</a>
          </div>`,
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private authorizationService: AuthorizationService,
              private router: Router) { }

  sendNewPassword(email: string) {
    this.router.navigateByUrl('/login');

    email = email.trim().toLowerCase();

    this.authorizationService.sendNewPassword(email);
  }
}
