import { Component, OnInit } from '@angular/core';

import { MainService } from '../../service/main.service';
import { AuthorizationService } from '../../service/authorization.service';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'my-app',
  template: `
    <div [className]="getCurrentTheme()">
        <main class="content">
            <router-outlet></router-outlet>
        </main>
        <background></background>
        <recommended-words></recommended-words>
        <pop-up></pop-up>
    </div>`,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor(public mainService: MainService,
              public authorizationService: AuthorizationService,
              public optionsService: OptionsService) {  }

  ngOnInit() {
    this.mainService.setUpApplication();
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
}
