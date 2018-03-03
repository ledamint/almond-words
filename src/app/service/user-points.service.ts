import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventsService } from './events.service';
import { OptionsService } from './options.service';
import { UserPoints } from './interface/interfaces';

@Injectable()
export class UserPointsService {
  userPoints: UserPoints;

  constructor(private http: HttpClient,
    private optionsService: OptionsService,
    private eventsService: EventsService) { }

  setUp(userPoints: UserPoints) {
    this.userPoints = userPoints;
  }

  updatePoints(pointsDifference: number) {
    this.http.post('user-points', ({pointsDifference}))
      .subscribe((userPoints: UserPoints) => {
        if (this.optionsService.activeOptions.isUserPointsActive) {
          this.eventsService.onShowMessage({
            text: pointsDifference > 0 ? `+${pointsDifference}` : String(pointsDifference)
          });
        }

        this.updateTodayPoints(pointsDifference)
          .then(() => {
            this.userPoints = userPoints;
          });
      },
      err => this.eventsService.onServerError(err)
    )
  }

  async updateTodayPoints(pointsDifference) {
    return new Promise((resolve) => {
      let delay = 0;

      for (let i = 0; i < Math.abs(pointsDifference); i++) {
        setTimeout(() => {
          if (pointsDifference > 0) this.userPoints.todayPoints += 1;
          if (pointsDifference < 0) this.userPoints.todayPoints -= 1;

          if (i === Math.abs(pointsDifference) - 1) resolve();
        }, delay);

        delay += 150;
      }
    });
  }
}
