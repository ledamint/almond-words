import { Component } from '@angular/core';

import { UserPointsService } from 'app/service/user-points.service';
import { OptionsService } from 'app/service/options.service';

@Component({
  selector: 'corner-user-points',
  template: `
        <div class="corner-user-points theme-color-background-third"
          *ngIf="userPointsService.userPoints && optionsService.activeOptions.isUserPointsActive">
          <span title="points today" [ngClass]="{
            'theme-color-text-second': userPointsService.userPoints?.todayPoints >= optionsService.activeOptions?.todayGoalPoints
          }">
            {{ userPointsService.userPoints?.todayPoints }} /
            {{ optionsService.activeOptions?.todayGoalPoints }}
          </span>
        </div>
        `,
  styleUrls: [ './corner-user-points.component.scss' ]
})
export class CornerUserPointsComponent {
  constructor(public userPointsService: UserPointsService,
    public optionsService: OptionsService) { }
}
