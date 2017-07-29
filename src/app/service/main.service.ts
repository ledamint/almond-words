import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { WordsService } from './words.service';
import { EventsService } from './events.service';
import { OptionsService } from './options.service';

import { User } from './interface/interfaces';

@Injectable()
export class MainService {
  constructor(private http: Http,
              private router: Router,
              private wordsService: WordsService,
              private eventsService: EventsService,
              private optionsService: OptionsService) { }

  setUpApplication() {
    this.http.get('user')
      .map(res => res.json())
      .subscribe(
        (user: User) => {
          this.optionsService.setUp(user.activeOptions);
          this.wordsService.setUp(user.boards[user.activeBoard].words);

          this.router.navigateByUrl('/cards');
        },
        err => this.eventsService.onServerError(err)
      );
  }
}
