import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';

// TODO: refresh words only after submit
@Component({
  selector: 'options',
  template: `
          <h1>Options</h1>
          <h2>Sort</h2>
          <div class="sorts">
              <span class="option-item theme-color" [class.active]="sort.isActive"
                *ngFor="let sort of optionsService.options.sorts" (click)="optionsService.updateSorts(sort.value)">{{ sort.name }}</span>
          </div>
          <h2>Filter</h2>
          <div class="knowledge">
              <span class="option-item option-item_title">knowledge:</span>
              <span class="option-item theme-color" [class.active]="knowledge.isActive"
                *ngFor="let knowledge of optionsService.options.filter.knowledge"
                (click)="optionsService.updateKnowledge(knowledge.name)">{{ knowledge.name }}</span>
          </div>
          <div class="buttons">
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
              private router: Router) { }

  ngOnInit() {
    this.optionsService.saveOptionsCopy();
  }

  submitOptions() {
    this.wordsService.updateWords();
    this.router.navigateByUrl('/cards');
  }
}
