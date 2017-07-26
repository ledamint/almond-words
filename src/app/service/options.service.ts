import { Injectable } from '@angular/core';

import { Options } from './main.service';

@Injectable()
export class OptionsService {
  options: Options;

  // TODO: move to options
  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 1;

  setUp(options: Options) {
    this.options = options;
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
