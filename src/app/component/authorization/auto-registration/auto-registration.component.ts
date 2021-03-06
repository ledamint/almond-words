import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainInfoService } from 'app/service/main-info.service';
import { AuthorizationService } from 'app/service/authorization.service';

import { RegistrationData } from 'app/service/interface/interfaces';

// TODO: make visual validation
@Component({
  selector: 'auto-registration',
  template: `
          <h1>Fast registration</h1>
          <form class="form" #registrationForm="ngForm" action="" method="post" (ngSubmit)="registerUser(registrationForm)">
              <h4 class="input-title">familiar language</h4>
              <select class="text-input" name="familiar-language" [(ngModel)]="familiarLanguage" required>
                  <option  value="{{ language }}" *ngFor="let language of mainInfoService.languages">{{ language | translate }}</option>
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
              <a routerLink="/registration" class="side-panel__item">full registration</a>
              <a routerLink="/login" class="side-panel__item">login</a>
          </div>
          `,
  styleUrls: ['./auto-registration.component.scss']
})
export class AutoRegistrationComponent {
  // TODO: move to main info
  familiarLanguage: string = 'ru';
  learningLanguage: string = 'en';
  isRulesAccepted: boolean = true;

  constructor(public mainInfoService: MainInfoService,
              public authorizationService: AuthorizationService) { }

  registerUser(form: NgForm) {
    const randomString: string = Math.random().toString(36).slice(2, 8);
    const email: string = `${randomString}@testmail.com`;

    const registrationData: RegistrationData = {
      email: email,
      password: randomString,
      learningLanguage: form.value['learning-language'],
      familiarLanguage: form.value['familiar-language']
    };

    this.authorizationService.registerUser(registrationData);
  }
}
