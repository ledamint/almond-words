import { Component } from '@angular/core';

import { UserPointsService } from 'app/service/user-points.service';
import { OptionsService } from 'app/service/options.service';

@Component({
  selector: 'corner-user-points',
  template: `
        <div class="corner-user-points" *ngIf="userPointsService.userPoints">
          <span>points today</span>
          <span>{{ userPointsService.userPoints?.todayPoints }} /
          {{ optionsService.activeOptions?.todayGoalPoints }}</span>
        </div>
        `,
  styleUrls: [ './corner-user-points.component.scss' ]
})
export class CornerUserPointsComponent {
  constructor(public userPointsService: UserPointsService,
    public optionsService: OptionsService) { }
}
