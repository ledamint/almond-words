import { Component } from '@angular/core';

import { OptionsService } from 'app/service/options.service';
import { MainInfoService } from 'app/service/main-info.service';

import { KnowledgeFilter } from 'app/service/interface/interfaces';

@Component({
  selector: 'words-options',
  template: `
          <div class="sorts">
              <h3>Sort</h3>
              <span class="option-item button" [class.active]="optionsService.activeOptions.sort === sort.value"
                *ngFor="let sort of mainInfoService.options.sorts" (click)="updateSort(sort.value)">{{ sort.name }}</span>
          </div>
          <div class="knowledge">
              <h3>Filter</h3>
              <span class="option-item button" [class.active]="optionsService.activeOptions.filter === filter"
                *ngFor="let filter of mainInfoService.options.filters" (click)="updateFilter(filter)">{{ filter }}</span>
          </div>`,
  styleUrls: ['./words-options.component.scss']
})
export class WordsOptionsComponent {
  constructor(public optionsService: OptionsService,
              public mainInfoService: MainInfoService) { }

  updateSort(sortValue: string) {
    this.optionsService.updateSorts(sortValue);
  }

  updateFilter(filter: string) {
    this.optionsService.updateFilter(filter);
  }
}
