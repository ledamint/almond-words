import { Component } from '@angular/core';

import { UserPointsService } from 'app/service/user-points.service';

@Component({
  selector: 'corner-user-points',
  template: `
        <div class="corner-user-points">
          <span class="today-points">{{ userPointsService.userPoints.todayPoints }} /
          {{ userPointsService.userPoints.todayGoalPoints }}</span>
        </div>
        `,
  styleUrls: [ './corner-user-points.component.scss' ]
})
export class CornerUserPointsComponent {
  constructor(public userPointsService: UserPointsService) { }
}
