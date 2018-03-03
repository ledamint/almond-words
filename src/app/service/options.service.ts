import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { EventsService } from './events.service';
import { MainInfoService } from './main-info.service';

import { ActiveOptions } from './interface/interfaces';

@Injectable()
export class OptionsService {
  activeOptions: ActiveOptions;
  activeOptionsCopy: ActiveOptions;
  currentTheme: string = 'blue-theme';
  isRecommendedWordsAvailable: boolean = false;
  learningLanguage: string;
  familiarLanguage: string;

  constructor(private http: HttpClient,
              private eventsService: EventsService,
              private mainInfoService: MainInfoService) { }

  setActiveOptions(activeOptions: ActiveOptions, learningLanguage: string, familiarLanguage: string) {
    this.activeOptions = activeOptions;
    this.learningLanguage = learningLanguage;
    this.familiarLanguage = familiarLanguage;

    this.updateCurrentTheme();
    this.updateIsRecommendedWordsAvailable();
  }

  updateActiveOptions() {
    this.validateTodayGoalPoints();
    this.validateWordsInCard();
    this.http.post('active-options', this.activeOptions)
      .subscribe(
        () => {

        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  validateNumber(number: number, min: number, max: number) {
    if (typeof number !== 'number') {
      number = min;
    } else if (number < min) {
      number = min;
    } else if (number > max) {
      number = max;
    }

    return number;
  }

  validateTodayGoalPoints() {
    this.activeOptions.todayGoalPoints = this.validateNumber(this.activeOptions.todayGoalPoints, 20, 500);
  }

  validateWordsInCard() {
    this.activeOptions.wordsInCard = this.validateNumber(this.activeOptions.wordsInCard, 5, 20);
  }

  saveOptionsCopy() {
    this.activeOptionsCopy = JSON.parse(JSON.stringify(this.activeOptions));
  }

  resetChanges() {
    this.activeOptions = this.activeOptionsCopy;
  }

  updateSorts(sort: string) {
    this.activeOptions.sort = sort;
  }

  updateFilter(filter: string) {
    this.activeOptions.filter = filter;
  }

  updateTheme(theme: string) {
    this.activeOptions.theme = theme;
    this.currentTheme = `${theme}-theme`;
  }

  toggleBackground() {
    this.activeOptions.isBackgroundActive = !this.activeOptions.isBackgroundActive;
  }

  toggleWordsOpacity() {
    this.activeOptions.isWordsOpacityActive = !this.activeOptions.isWordsOpacityActive;
  }

  toggleRecommendedWords() {
    this.activeOptions.isRecommendedWordsActive = !this.activeOptions.isRecommendedWordsActive;
  }

  toggleUserPoints() {
    this.activeOptions.isUserPointsActive = !this.activeOptions.isUserPointsActive;
  }

  updateIsRecommendedWordsAvailable() {
    this.isRecommendedWordsAvailable = this.mainInfoService.recommendedWordsAvailableLangs.indexOf(this.learningLanguage) !== -1 &&
      this.mainInfoService.recommendedWordsAvailableLangs.indexOf(this.familiarLanguage) !== -1;
  }

  updateCurrentTheme() {
    let currentTheme: string;

    if (this.activeOptions === undefined || this.activeOptions.theme === undefined) {
      currentTheme = 'blue-theme';
    } else {
      currentTheme = `${this.activeOptions.theme}-theme`;
    }

    this.currentTheme = currentTheme;
  }
}
