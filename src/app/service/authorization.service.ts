import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router'

import { MainService } from './main.service';
import { EventsService } from './events.service';

@Injectable()
export class AuthorizationService {
  constructor(private http: Http,
              private router: Router,
              private mainService: MainService,
              private eventsService: EventsService) { }

  checkLogin(userData: Object = { }) {
    this.http.post('login', userData)
      .map(res => res.json())
      .subscribe(
        // TODO: divide requests
        (isLoginDone) => {
          if (isLoginDone) {
            this.mainService.setUpApplication();
            this.router.navigateByUrl('/cards');
          }
          else this.router.navigateByUrl('/login');
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
        () => this.router.navigateByUrl('/login'),
        err => this.eventsService.onServerError(err)
      );
  }
}
