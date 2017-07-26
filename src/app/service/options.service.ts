import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { MainService, Options } from './main.service';
import { EventsService } from './events.service';

@Injectable()
export class OptionsService {
  options: Options;

  // TODO: move to options
  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 1;

  constructor(private mainService: MainService,
              private eventsService: EventsService,
              private http: Http) {
    this.eventsService.userDataIsReady$.subscribe(() => {
      this.setUpOptions();
    })
  }

  setUpOptions() {
    this.options = this.mainService.user.options;

    if (this.options === undefined) this.mainService.distributeWords();
    else {
      const activeSort = this.options.sorts.find(sort => sort.isActive) || { value: 'time' };

      this.sortWords(activeSort.value);
      this.mainService.distributeWords();
    }
  }

  sortWords(key: string, isInverse: boolean = false) {
    if (key === 'knowledge') isInverse = true;

    this.options.sorts.forEach((sort) => {
      if (sort.value === key) sort.isActive = true;
      else sort.isActive = false;
    });

    let a = 1;
    let b = -1

    if (isInverse) {
      a = -1;
      b = 1;
    }

    this.mainService.words.sort((word1, word2) => {
      if (word1[key] > word2[key]) return a;
      if (word1[key] < word2[key]) return b;
    });
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
