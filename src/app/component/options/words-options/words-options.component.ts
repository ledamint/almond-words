import { Component } from '@angular/core';

import { OptionsService } from 'app/service/options.service';
import { MainInfoService } from 'app/service/main-info.service';

@Component({
  selector: 'words-options',
  template: `
          <div class="sorts">
              <h3>Sort</h3>
              <span class="option-item button" [class.active]="optionsService.activeOptions.sort === sort.value"
                *ngFor="let sort of mainInfoService.options.sorts" (click)="updateSort(sort.value)">{{ sort.name }}</span>
          </div>
          <div class="user-points">
              <h3 title="points which you plan to earn every day">User points</h3>
              <span class="option-item button active" [class.active]="optionsService.activeOptions.isUserPointsActive"
                  (click)="toggleUserPoints()">active</span>
              <div class="per-day" *ngIf="optionsService.activeOptions.isUserPointsActive">
                  <span class="option-item option-item-label">points goal per day:</span>
                  <input class="text-input" type="number" min="20" max="500"
                    [(ngModel)]="optionsService.activeOptions.todayGoalPoints" required>
              </div>
          </div>
          <div class="cards">
              <h3>Cards</h3>
              <div>
                  <span class="option-item option-item-label">words in card</span>
                  <input class="text-input" type="number" min="5" max="20"
                    [(ngModel)]="optionsService.activeOptions.wordsInCard" required>
              </div>
          </div>
        `,
  styleUrls: ['./words-options.component.scss']
})
export class WordsOptionsComponent {
  constructor(public optionsService: OptionsService,
              public mainInfoService: MainInfoService) { }

  updateSort(sortValue: string) {
    this.optionsService.updateSorts(sortValue);
  }

  toggleUserPoints() {
    this.optionsService.toggleUserPoints();
  }
}
