import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Options, ActiveOptions, KnowledgeFilter } from './interface/interfaces';

// TODO move common options data to separate collection

@Injectable()
export class OptionsService {
  options: Options;
  activeOptions: ActiveOptions;
  activeOptionsCopy: ActiveOptions;

  // TODO: move to options
  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 1;

  constructor(private http: Http) { }

  setUp(activeOptions: ActiveOptions) {
    this.activeOptions = activeOptions;

    this.http.get('options')
      .map(res => res.json())
      .subscribe((options: Options) => {
        this.options = options;
      });
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

  updateKnowledge(selectedKnowledge: KnowledgeFilter) {
    let selectedKnowledgeIsActive = false;

    this.activeOptions.filter.knowledge = this.activeOptions.filter.knowledge.filter((knowledge) => {
      if (knowledge.name === selectedKnowledge.name) {
        selectedKnowledgeIsActive = true;

        return false;
      }

      return true;
    });

    if (!selectedKnowledgeIsActive) {
      this.activeOptions.filter.knowledge.push(selectedKnowledge);
    }
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
