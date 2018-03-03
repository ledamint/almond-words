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
    this.http.post('active-options', this.activeOptions)
      .subscribe(
        () => {

        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
  }

  validateTodayGoalPoints() {
    let todayGoalPoints = this.activeOptions.todayGoalPoints;
    // TODO move to config
    const minPoints = 20;
    const maxPoints = 500;

    if (typeof todayGoalPoints !== 'number') {
      todayGoalPoints = minPoints;
    } else if (todayGoalPoints < minPoints) {
      todayGoalPoints = minPoints;
    } else if (todayGoalPoints > maxPoints) {
      todayGoalPoints = maxPoints;
    }

    this.activeOptions.todayGoalPoints = todayGoalPoints;
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
