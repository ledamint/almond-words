import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MainService } from '../../service/main.service';
import { AuthorizationService } from '../../service/authorization.service';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'my-app',
  template: `
    <div [className]="'wrapper ' + optionsService.currentTheme">
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
  constructor(public translate: TranslateService,
              public mainService: MainService,
              public authorizationService: AuthorizationService,
              public optionsService: OptionsService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.mainService.setUpApplication();
    this.authorizationService.checkLogin();
  }
}
