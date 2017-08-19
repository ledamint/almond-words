import { Component, OnInit } from '@angular/core';

import { MainService } from '../../service/main.service';
import { AuthorizationService } from '../../service/authorization.service';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="wrapper" [className]="getCurrentTheme()">
        <main class="content">
            <router-outlet></router-outlet>
        </main>
        <background></background>
        <pop-up></pop-up>
    </div>`,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor(private mainService: MainService,
              private authorizationService: AuthorizationService,
              private optionsService: OptionsService) {  }

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
