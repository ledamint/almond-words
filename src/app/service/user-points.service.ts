import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventsService } from './events.service';
import { UserPoints } from './interface/interfaces';

@Injectable()
export class UserPointsService {
  userPoints: UserPoints;

  constructor(private http: HttpClient,
    private eventsService: EventsService) { }

  setUp(userPoints: UserPoints) {
    this.userPoints = userPoints;
  }

  updatePoints(pointsDifference: number) {
    this.http.post('user-points', ({pointsDifference}))
      .subscribe((userPoints: UserPoints) => {
        this.userPoints = userPoints;
      },
      err => this.eventsService.onServerError(err)
    )
  }
}
