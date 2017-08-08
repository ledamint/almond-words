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
          </div>
          <h3>Theme</h3>
          <div class="themes">
              <span class="option-item option-item_title">color:</span>
              <span class="option-item button" [class.active]="optionsService.activeOptions.theme === theme"
                *ngFor="let theme of optionsService.options.themes" (click)="updateTheme(theme)">{{ theme }}</span>
          </div>
          <div class="background">
              <span class="option-item option-item_title">background:</span>
              <span class="option-item button" [class.active]="optionsService.activeOptions.isBackgroundActive"
                (click)="toggleBackground()">active</span>
          </div>`,
  styleUrls: ['./words-options.component.scss']
})
export class WordsOptionsComponent {
  constructor(private optionsService: OptionsService) { }

  updateSort(sortValue: string) {
    this.optionsService.updateSorts(sortValue);
  }

  updateTheme(theme: string) {
    this.optionsService.updateTheme(theme);
  }

  toggleBackground() {
    this.optionsService.toggleBackground();
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
