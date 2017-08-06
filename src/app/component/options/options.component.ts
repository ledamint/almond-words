import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';
import { BackgroundService } from '../../service/background.service';

import { KnowledgeFilter } from '../../service/interface/interfaces';

// TODO: do background checkbox
@Component({
  selector: 'options',
  template: `
          <h1 class="theme-color-border">Options</h1>
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
          </div>
          <div class="buttons theme-color-border">
              <button class="button" (click)="submitOptions()">Submit</button>
          </div>
          <div class="side-panel">
              <a routerLink="/cards" routerLinkActive="active" class="side-panel__item" (click)="optionsService.resetChanges()">cards</a>
          </div>`,
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  constructor(private wordsService: WordsService,
              private optionsService: OptionsService,
              private backgroundService: BackgroundService,
              private router: Router) { }

  ngOnInit() {
    this.optionsService.saveOptionsCopy();
  }

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

  submitOptions() {
    this.wordsService.updateWords();
    this.router.navigateByUrl('/cards');
    this.optionsService.updateActiveOptions();

    if (this.optionsService.activeOptions.isBackgroundActive !== this.optionsService.activeOptionsCopy.isBackgroundActive) {
      if (this.optionsService.activeOptions.isBackgroundActive) this.backgroundService.setUp();
      else this.backgroundService.reset();
    }
  }
}
