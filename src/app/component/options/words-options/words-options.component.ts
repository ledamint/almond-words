import { Component } from '@angular/core';

import { OptionsService } from 'app/service/options.service';

import { KnowledgeFilter } from 'app/service/interface/interfaces';

// TODO: do background checkbox
@Component({
  selector: 'words-options',
  template: `
          <h3>Sort</h3>
          <div class="sorts">
              <span class="option-item button" [class.active]="optionsService.activeOptions.sort === sort.value"
                *ngFor="let sort of optionsService.options.sorts" (click)="updateSort(sort.value)">{{ sort.name }}</span>
          </div>
          <h3>Filter</h3>
          <div class="knowledge">
              <span class="option-item option-item_title">knowledge:</span>
              <span class="option-item button"
                *ngFor="let knowledgeFilter of optionsService.options.filter.knowledge"
                [class.active]="checkKnowledgeActive(knowledgeFilter.name)"
                (click)="updateKnowledge(knowledgeFilter)">{{ knowledgeFilter.name }}</span>
          </div>`,
  styleUrls: ['./words-options.component.scss']
})
export class WordsOptionsComponent {
  constructor(private optionsService: OptionsService) { }

  updateSort(sortValue: string) {
    this.optionsService.updateSorts(sortValue);
  }

  updateKnowledge(knowledge: KnowledgeFilter) {
    this.optionsService.updateKnowledge(knowledge);
  }

  checkKnowledgeActive(knowledgeFilterName: string) {
    return -1 < this.optionsService.activeOptions.filter.knowledge.findIndex((knowledge) => {
      return knowledge.name === knowledgeFilterName;
    });
  }
}
