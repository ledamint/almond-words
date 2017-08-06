import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthorizationService } from 'app/service/authorization.service';

import { RegistrationData } from 'app/service/interface/interfaces';

@Component({
  selector: 'registration',
  template: `
          <h1>Registration</h1>
          <form class="form" #registrationForm="ngForm" action="" method="post" (ngSubmit)="registerUser(registrationForm)">
              <input class="text-input" type="email" name="email" placeholder="email" focus="true" ngModel required>
              <input class="text-input" type="password" name="password" placeholder="password" ngModel required>
              <input class="text-input" type="password" name="confirm-password" placeholder="confirm-password" ngModel required>
              <input class="text-input" type="text" name="learning-language" placeholder="learning language" ngModel required>
              <input class="text-input" type="text" name="familiar-language" placeholder="familiar language" ngModel required>
              <button class="button" type="submit" [disabled]="!registrationForm.valid">Submit</button>
          </form>
          <div class="side-panel">
              <a routerLink="/login" routerLinkActive="active" class="side-panel__item">login</a>
          </div>`,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private authorizationService: AuthorizationService) { }

  registerUser(form: NgForm) {
    if (form.value.password !== form.value['confirm-password']) alert('passwords don\'t match');
    else {
      const email: string = form.value.email.trim().toLowerCase();

      const registrationData: RegistrationData = {
        email: email,
        password: form.value.password,
        learningLanguage: form.value['learning-language'],
        familiarLanguage: form.value['familiar-language']
      };

      this.authorizationService.registerUser(registrationData);
    }
  }
}
