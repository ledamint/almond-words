import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { EventsService } from './events.service';
import { MainInfoService } from './main-info.service';
import { WordsService } from './words.service';
import { OptionsService } from './options.service';
import { AccountInformationService } from './account-information.service';
import { BackgroundService } from './background.service';

import { MainApplicationInfo, User } from './interface/interfaces';

@Injectable()
export class MainService {
  constructor(private http: HttpClient,
              private router: Router,
              private eventsService: EventsService,
              private mainInfoService: MainInfoService,
              private wordsService: WordsService,
              private optionsService: OptionsService,
              private accountInformationService: AccountInformationService,
              private backgroundService: BackgroundService) { }

  setUpApplication() {
    this.http.get('main-info')
      .subscribe(
        (mainInfo: MainApplicationInfo) => {
          this.mainInfoService.setUp(mainInfo);
        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  setUpUser() {
    this.http.get('user')
      .subscribe(
        (user: User) => {
          this.optionsService.setActiveOptions(user.activeOptions, user.learningLanguage, user.familiarLanguage);
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
