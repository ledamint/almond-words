import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventsService } from './events.service';

@Injectable()
export class AccountInformationService {
  email: string;

  constructor(private http: HttpClient,
              private eventsService: EventsService) { }

  setUp(email: string) {
    this.email = email;
  }

  updateEmail(email: string) {
    this.http.post('email', { email })
      .subscribe(
        (updatedEmail: { email: string; }) => {
          this.email = updatedEmail.email;
          this.eventsService.onShowMessage({ text: 'Changed!' });
        },
        (err) => this.eventsService.onServerError(err)
      );
  }

  changePassword(password: string) {
    this.http.post('password', { password })
      .subscribe(
        () => {
          this.eventsService.onShowMessage({ text: 'Changed!' });
        },
        (err) => this.eventsService.onServerError(err)
      );
  }
}
