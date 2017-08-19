import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { EventsService } from './events.service';
import { WordsService } from './words.service';
import { OptionsService } from './options.service';
import { AccountInformationService } from './account-information.service';
import { BackgroundService } from './background.service';

import { MainApplicationInfo, User } from './interface/interfaces';

@Injectable()
export class MainService {
  // TODO: move to main info service
  languages: string[];

  constructor(private http: Http,
              private router: Router,
              private eventsService: EventsService,
              private wordsService: WordsService,
              private optionsService: OptionsService,
              private accountInformationService: AccountInformationService,
              private backgroundService: BackgroundService) { }

  setUpApplication() {
    this.http.get('main-info')
      .map(res => res.json())
      .subscribe(
        (mainInfo: MainApplicationInfo) => {
          this.languages = mainInfo.languages;
          // TODO move standart options outside optionsService
          this.optionsService.setUp(mainInfo.options);
        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  setUpUser() {
    this.http.get('user')
      .map(res => res.json())
      .subscribe(
        (user: User) => {
          this.optionsService.setActiveOptions(user.activeOptions);
          this.accountInformationService.setUp(user.email);
          this.wordsService.setUp(user.boards[user.activeBoard]);
          if (this.optionsService.activeOptions.isBackgroundActive) this.backgroundService.setUp();

          this.router.navigateByUrl('/cards');
        },
        (err) => {
          this.eventsService.onServerError(err);

          this.router.navigateByUrl('/login');
        }
      );
  }
}
