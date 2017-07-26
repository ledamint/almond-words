import { Component, OnInit } from '@angular/core';

import { AuthorizationService }  from '../../service/authorization.service';
import { EventsService }  from '../../service/events.service';
import { OptionsService }  from '../../service/options.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="wrapper" [class.blue-theme]="optionsService.themes[optionsService.currentThemeId] === 'blue' ? true : false">
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <!-- <background></background> -->
        <div class="pop-up error" [hidden]="!err.status">
          <h2>A {{ err.status }} {{ err.statusText }} error has occured</h2>
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

  showError(err) {
    this.err = err;

    setTimeout(() => {
      this.err = { };
    }, 3000);
  }
}
