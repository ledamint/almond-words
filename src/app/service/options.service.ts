import { Injectable } from '@angular/core';

import { Options } from './main.service';

// TODO move common options data to separate collection

@Injectable()
export class OptionsService {
  options: Options;
  optionsCopy: Options;

  // TODO: move to options
  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 1;

  setUp(options: Options) {
    this.options = options;
  }

  saveOptionsCopy() {
    this.optionsCopy = JSON.parse(JSON.stringify(this.options));
  }

  resetChanges() {
    this.options = this.optionsCopy;
  }

  updateSorts(sortValue: string) {
    this.options.sorts.forEach((sort) => {
      if (sort.value === sortValue) sort.isActive = true;
      else sort.isActive = false;
    });
  }

  updateKnowledge(knowledgeName: string) {
    this.options.filter.knowledge.forEach((knowledgeItem) => {
      if (knowledgeItem.name === knowledgeName) knowledgeItem.isActive = !knowledgeItem.isActive;
    });
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
