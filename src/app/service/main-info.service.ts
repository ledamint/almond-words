import { Injectable } from '@angular/core';

import { MainApplicationInfo, Options } from './interface/interfaces';

@Injectable()
export class MainInfoService {
  // TODO: move to main info service all common data like points, languages, main options
  languages: string[] = [];
  recommendedWordsAvailableLangs: string[] = [];
  options: Options;

  constructor() { }

  setUp(mainInfo: MainApplicationInfo) {
    this.languages = mainInfo.languages;
    this.options = mainInfo.options;
    this.recommendedWordsAvailableLangs = mainInfo.recommendedWordsAvailableLangs;
  }
}
