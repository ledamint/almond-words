import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { EventsService } from './events.service';

@Injectable()
export class AccountInformationService {
  email: string;

  constructor(private http: Http,
              private eventsService: EventsService) { }

  setUp(email: string) {
    this.email = email;
  }

  updateEmail(email: string) {
    this.http.post('email', { email })
      .map((res) => res.text())
      .subscribe(
        (updatedEmail: string) => {
          this.email = updatedEmail;
          this.eventsService.onShowMessage({ text: 'Changed!' });
        },
        (err) => this.eventsService.onServerError(err)
      );
  }

  changePassword(password: string) {
    this.http.post('password', { password })
      .map((res) => res.text())
      .subscribe(
        () => {
          this.eventsService.onShowMessage({ text: 'Changed!' });
        },
        (err) => this.eventsService.onServerError(err)
      );
  }
}
