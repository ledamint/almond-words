import { Component, OnInit } from '@angular/core';

import { EventsService } from 'app/service/events.service';

import { Message } from 'app/service/interface/interfaces';

@Component({
  selector: 'pop-up',
  template: `
        <div class="pop-up pop-up_error" [hidden]="!err.isActive">
            <h2>{{ err.status }} {{ err._body || err.statusText }}</h2>
        </div>
        <div class="pop-up" [hidden]="!message.isActive">
            <h2>{{ message.text }}</h2>
        </div>`,
  styleUrls: [ './pop-up.component.scss' ]
})
export class PopUpComponent implements OnInit {
  // TODO add type
  err = {
    status: '',
    statusText: '',
    _body: '',
    isActive: false,
  };
  message: Message = { text: '', isActive: false };

  constructor(public eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.serverError$
      .subscribe(err => this.showError(err));

    this.eventsService.showMessage$
      .subscribe(message => this.showMessage(message));
  }

  showError(err) {
    this.err = err;
    this.err.isActive = true;

    setTimeout(() => {
      this.err.isActive = false;
    }, 3000);
  }

  showMessage(message: Message) {
    this.message = message;
    this.message.isActive = true;

    setTimeout(() => {
      this.message.isActive = false;
    }, 3000);
  }
}
