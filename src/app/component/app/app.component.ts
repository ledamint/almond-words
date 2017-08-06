import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../service/authorization.service';
import { EventsService } from '../../service/events.service';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="wrapper" [className]="getCurrentTheme()">
        <main class="content">
            <router-outlet></router-outlet>
        </main>
        <background></background>
        <div class="pop-up error" [hidden]="!err.status">
            <h2>{{ err.status }} {{ err._body || err.statusText }}</h2>
        </div>
    </div>`,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  // TODO add type
  err: Object = { };

  constructor(private authorizationService: AuthorizationService,
              private eventsService: EventsService,
              private optionsService: OptionsService) {  }

  ngOnInit() {
    this.eventsService.serverError$
      .subscribe(err => this.showError(err));

    this.authorizationService.checkLogin();
  }

  getCurrentTheme() {
    let currentTheme: string;

    if (this.optionsService.activeOptions === undefined || this.optionsService.activeOptions.theme === undefined) {
      currentTheme = 'blue-theme';
    } else {
      currentTheme = `${this.optionsService.activeOptions.theme}-theme`;
    }

    return `wrapper ${currentTheme}`;
  }

  showError(err) {
    this.err = err;

    setTimeout(() => {
      this.err = { };
    }, 3000);
  }
}
