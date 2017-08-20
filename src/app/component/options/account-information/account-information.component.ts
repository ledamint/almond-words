import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';

import { AccountInformationService } from 'app/service/account-information.service';

@Component({
  selector: 'account-information',
  template: `
        <form class="form" #emailForm="ngForm" action="" method="post" (ngSubmit)="updateEmail(emailForm.value.email)">
            <h3>Email</h3>
            <input class="text-input" type="email" name="email" placeholder="email" focus="true"
              [ngModel]="accountInformationService.email" required email>
            <button class="button" type="submit" [disabled]="!emailForm.valid">Change email</button>
        </form>
        <form class="form" #passwordForm="ngForm" action="" method="post" (ngSubmit)="changePassword(passwordForm.value.password)">
            <h3>Password</h3>
            <div class="input-wrapper">
                <input class="text-input" type="password" name="password" placeholder="password" ngModel required minlength="6">
                <span class="prompt">min 6 symbols</span>
            </div>
            <input class="text-input" type="password" name="confirm-password" placeholder="confirm password" ngModel required>
            <button class="button" type="submit" [disabled]="!passwordForm.valid ||
              passwordForm.value.password !== passwordForm.value['confirm-password']">Change password</button>
        </form>
          `,
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent {
  constructor(private accountInformationService: AccountInformationService) { }

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
