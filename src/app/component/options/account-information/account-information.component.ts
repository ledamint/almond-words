import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';

import { AccountInformationService } from 'app/service/account-information.service';

@Component({
  selector: 'account-information',
  template: `
        <form class="form" #emailForm="ngForm" action="" method="post" (ngSubmit)="updateEmail(emailForm.value.email)">
            <h3>Email</h3>
            <div class="input-wrapper">
                <input class="text-input" type="email" name="email" placeholder="email" focus="true"
                  [ngModel]="accountInformationService.email" required email>
                <span class="prompt theme-color-text-second-color" [hidden]="isAutoEmail(emailForm.value.email)">
                  change to your email if you want to save progress</span>
            </div>
            <button class="button" type="submit" [disabled]="!emailForm.valid">Change email</button>
        </form>
        <form class="form" #passwordForm="ngForm" action="" method="post" (ngSubmit)="changePassword(passwordForm.value.password)">
            <h3>Password</h3>
            <div class="input-wrapper">
                <input class="text-input" type="password" name="password" placeholder="password" ngModel required minlength="6">
                <span class="prompt theme-color-text-second-color">min 6 symbols</span>
            </div>
            <input class="text-input" type="password" name="confirm-password" placeholder="confirm password" ngModel required>
            <button class="button" type="submit" [disabled]="!passwordForm.valid ||
              passwordForm.value.password !== passwordForm.value['confirm-password']">Change password</button>
        </form>
          `,
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent {
  constructor(public accountInformationService: AccountInformationService) { }

  isAutoEmail(email: string) {
    if (email === undefined) return true;

    return email.search('@testmail.com') === -1;
  }

  updateEmail(email: string) {
    if (confirm('Are you sure to change email?')) {
      email = email.trim().toLowerCase();

      this.accountInformationService.updateEmail(email);
    }
  }

  changePassword(password: string) {
    if (confirm('Are you sure to change password?')) {
      this.accountInformationService.changePassword(password);
    }
  }
}
