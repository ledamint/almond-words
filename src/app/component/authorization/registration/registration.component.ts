import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';

import { MainInfoService } from 'app/service/main-info.service';
import { AuthorizationService } from 'app/service/authorization.service';
import { SessionService } from 'app/service/session.service';

import { RegistrationData } from 'app/service/interface/interfaces';

// TODO: make visual validation
@Component({
  selector: 'registration',
  template: `
          <h1>Registration</h1>
          <form class="form" #registrationForm="ngForm" action="" method="post" (ngSubmit)="registerUser(registrationForm)">
              <h4 class="input-title">email</h4>
              <div class="input-wrapper">
                  <input class="text-input" type="email" name="email" myAutofocus
                    [(ngModel)]="sessionService.registrationEmail" required email>
                  <span class="prompt theme-color-text-second">verification is not needed</span>
              </div>
              <h4 class="input-title">password</h4>
              <div class="input-wrapper">
                  <input class="text-input" type="password" name="password"
                    [(ngModel)]="sessionService.registrationPassword" required required minlength="6">
                  <span class="prompt theme-color-text-second">min 6 symbols</span>
              </div>
              <h4 class="input-title">familiar language</h4>
              <select class="text-input" name="familiar-language" [(ngModel)]="familiarLanguage" required>
                  <option value="{{ language }}" *ngFor="let language of mainInfoService.languages">{{ language | translate }}</option>
              </select>
              <h4 class="input-title">learning language</h4>
              <select class="text-input" type="text" name="learning-language" [(ngModel)]="learningLanguage" required>
                  <option value="{{ language }}" *ngFor="let language of mainInfoService.languages">{{ language | translate }}</option>
              </select>
              <label class="rules">
                  <input type="checkbox" [(ngModel)]="isRulesAccepted" name="rules" required>
                  <span class="label">Я согласен с <a class="theme-color-text-second" routerLink="/rules">правилами</a></span>
              </label>
              <button class="button" type="submit" [disabled]="!registrationForm.valid || !isRulesAccepted">Sign up</button>
          </form>
          <div class="side-panel">
              <a routerLink="/auto-registration" class="side-panel__item">fast registration</a>
              <a routerLink="/login" class="side-panel__item">login</a>
          </div>`,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  // TODO: move to main info
  familiarLanguage: string = 'ru';
  learningLanguage: string = 'en';
  isRulesAccepted: boolean = true;

  constructor(public mainInfoService: MainInfoService,
              public sessionService: SessionService,
              public authorizationService: AuthorizationService) { }

  registerUser(form: NgForm) {
    const email: string = this.sessionService.registrationEmail.trim().toLowerCase();

    const registrationData: RegistrationData = {
      email: email,
      password: this.sessionService.registrationPassword,
      learningLanguage: form.value['learning-language'],
      familiarLanguage: form.value['familiar-language']
    };

    this.authorizationService.registerUser(registrationData);
  }
}
