import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { EventsService } from './events.service';
import { WordsService } from './words.service';
import { OptionsService } from './options.service';
import { BackgroundService } from './background.service';

import { User } from './interface/interfaces';

@Injectable()
export class MainService {
  constructor(private http: Http,
              private router: Router,
              private eventsService: EventsService,
              private wordsService: WordsService,
              private optionsService: OptionsService,
              private backgroundService: BackgroundService) { }

  setUpApplication() {
    this.http.get('user')
      .map(res => res.json())
      .subscribe(
        (user: User) => {
          this.optionsService.setUp(user.activeOptions);
          this.wordsService.setUp(user.boards[user.activeBoard].words);
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
