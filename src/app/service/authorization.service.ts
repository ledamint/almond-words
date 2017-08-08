import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { MainService } from './main.service';
import { EventsService } from './events.service';
import { BackgroundService } from './background.service';

import { LoginData, RegistrationData } from './interface/interfaces';

@Injectable()
export class AuthorizationService {
  constructor(private http: Http,
              private router: Router,
              private mainService: MainService,
              private eventsService: EventsService,
              private backgroundService: BackgroundService) { }

  registerUser(registrationData: RegistrationData) {
    this.http.post('registration', registrationData)
      .map(res => res.json())
      .subscribe(
        (isLoginDone) => {
          this.mainService.setUpApplication();
        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  checkLogin(loginData: LoginData = { }) {
    this.http.post('login', loginData)
      .map(res => res.json())
      .subscribe(
        // TODO: divide requests
        (isLoginDone) => {
          if (isLoginDone) {
            this.mainService.setUpApplication();
          } else this.router.navigateByUrl('/registration');
        },
        (err) => {
          this.eventsService.onServerError(err);
          this.router.navigateByUrl('/login');
        }
      );
  }

  logout() {
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
