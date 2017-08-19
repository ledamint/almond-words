import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { EventsService } from './events.service';

import { Options, ActiveOptions, KnowledgeFilter } from './interface/interfaces';

@Injectable()
export class OptionsService {
  options: Options;
  activeOptions: ActiveOptions;
  activeOptionsCopy: ActiveOptions;

  constructor(private http: Http,
              private eventsService: EventsService) { }

  setUp(options: Options) {
    this.options = options;
  }

  setActiveOptions(activeOptions: ActiveOptions) {
    this.activeOptions = activeOptions;
  }

  updateActiveOptions() {
    this.http.post('active-options', this.activeOptions)
      .map(res => res.json())
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
