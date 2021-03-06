import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MainService } from './main.service';
import { EventsService } from './events.service';
import { WordsService } from './words.service';
import { BackgroundService } from './background.service';

import { LoginData, RegistrationData } from './interface/interfaces';

@Injectable()
export class AuthorizationService {
  constructor(private http: HttpClient,
              private router: Router,
              private mainService: MainService,
              private eventsService: EventsService,
              private wordsService: WordsService,
              private backgroundService: BackgroundService) { }

  registerUser(registrationData: RegistrationData) {
    this.http.post('registration', registrationData)
      .subscribe(
        (isLoginDone: boolean) => {
          this.mainService.setUpUser();
        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  checkLogin(loginData: LoginData = { }) {
    this.http.post('login', loginData)
      .subscribe(
        // TODO: divide requests
        (isLoginDone: boolean) => {
          if (isLoginDone) {
            this.mainService.setUpUser();
          } else this.router.navigateByUrl('/auto-registration');
        },
        (err) => {
          this.eventsService.onServerError(err);
          this.router.navigateByUrl('/login');
        }
      );
  }

  sendNewPassword(email: string) {
    this.http.post('forget-password', { email })
      .subscribe(
        () => {
          this.eventsService.onShowMessage({ text: 'Sent!' });
        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  logout() {
    this.wordsService.recommendedWords = [];

    this.http.post('logout', { })
      .subscribe(
        () => {
          this.router.navigateByUrl('/login');
          this.backgroundService.reset();
        },
        err => this.eventsService.onServerError(err)
      );
  }
}
