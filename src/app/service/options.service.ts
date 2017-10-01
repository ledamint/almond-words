import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { EventsService } from './events.service';

import { ActiveOptions, KnowledgeFilter } from './interface/interfaces';

@Injectable()
export class OptionsService {
  activeOptions: ActiveOptions;
  activeOptionsCopy: ActiveOptions;
  learningLanguage: string;
  familiarLanguage: string;

  constructor(private http: HttpClient,
              private eventsService: EventsService) { }

  setActiveOptions(activeOptions: ActiveOptions, learningLanguage: string, familiarLanguage: string) {
    this.activeOptions = activeOptions;
    this.learningLanguage = learningLanguage;
    this.familiarLanguage = familiarLanguage;
  }

  updateActiveOptions() {
    this.http.post('active-options', this.activeOptions)
      .subscribe(
        () => {

        },
        (err) => {
          this.eventsService.onServerError(err);
        }
      );
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

  updateTheme(theme: string) {
    this.activeOptions.theme = theme;
  }

  toggleBackground() {
    this.activeOptions.isBackgroundActive = !this.activeOptions.isBackgroundActive;
  }

  toggleWordsOpacity() {
    this.activeOptions.isWordsOpacityActive = !this.activeOptions.isWordsOpacityActive;
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
}
