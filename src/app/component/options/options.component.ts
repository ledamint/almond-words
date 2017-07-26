import { Component } from '@angular/core';

import { MainService }  from '../../service/main.service';
import { OptionsService }  from '../../service/options.service';

// TODO: refresh words only after submit
@Component({
  selector: 'options',
  template: `
          <h1>Options</h1>
          <h2>Sort</h2>
          <div class="sorts">
            <span class="option-item theme-color" [class.active]="sort.isActive"
            *ngFor="let sort of optionsService.options.sorts" (click)="mainService.sortWords(sort.value)">{{ sort.name }}</span>
          </div>
          <h2>Filters</h2>
          <div class="knowledge">
          <span class="option-item option-item_title">knowledge:</span>
            <span class="option-item theme-color" [class.active]="knowledge.isActive"
            *ngFor="let knowledge of optionsService.options.filter.knowledge" (click)="mainService.filterKnowledge(optionsService.options.filter.knowledge)">{{ knowledge.name }}</span>
          </div>
          <div class="buttons">
            <button class="button">Submit</button>
            <button class="button">Cancel</button>
          </div>
          <div class="side-panel">
              <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
          </div>`,
  styleUrls: ['./options.component.scss']
})
export class Options {
  constructor(private mainService: MainService,
              private optionsService: OptionsService) { }
}
