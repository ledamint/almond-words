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
          // TODO: show pop-up
          this.email = updatedEmail;
        },
        (err) => this.eventsService.onServerError(err)
      );
  }
}
