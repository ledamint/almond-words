import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainService } from 'app/service/main.service';
import { AuthorizationService } from 'app/service/authorization.service';

import { RegistrationData } from 'app/service/interface/interfaces';

// TODO: make visual validation
@Component({
  selector: 'auto-registration',
  template: `
          <h1>Choose languages</h1>
          <form class="form" #registrationForm="ngForm" action="" method="post" (ngSubmit)="registerUser(registrationForm)">
              <h4 class="input-title">familiar language</h4>
              <select class="text-input" name="familiar-language" ngModel required>
                  <option value="{{ language }}" *ngFor="let language of mainService.languages">{{ language }}</option>
              </select>
              <h4 class="input-title">learning language</h4>
              <select class="text-input" type="text" name="learning-language" ngModel required>
                  <option value="{{ language }}" *ngFor="let language of mainService.languages">{{ language }}</option>
              </select>
              <button class="button" type="submit" [disabled]="!registrationForm.valid">Submit</button>
          </form>
          <div class="side-panel">
              <a routerLink="/registration" class="side-panel__item">full registration</a>
              <a routerLink="/login" class="side-panel__item">login</a>
              <a routerLink="/about-us" class="side-panel__item">about us</a>
          </div>`,
  styleUrls: ['./auto-registration.component.scss']
})
export class AutoRegistrationComponent {
  constructor(public mainService: MainService,
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