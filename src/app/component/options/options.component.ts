import { Component } from '@angular/core';

import { OptionsService }  from '../../service/options.service';

@Component({
  selector: 'options',
  template: `
          <h1>Options</h1>
          <h2>Sort</h2>
          <div class="sorts">
            <span class="sort theme-color" [class.active]="sort.isActive"
            *ngFor="let sort of optionsService.options.sorts" (click)="optionsService.sortWords(sort.value)">{{ sort.name }}</span>
          </div>
          <div class="side-panel">
              <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
          </div>`,
  styleUrls: ['./options.component.scss']
})
export class Options {
  constructor(private optionsService: OptionsService) { }
}
