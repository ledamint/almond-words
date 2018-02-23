import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPoints } from './interface/interfaces';

@Injectable()
export class UserPointsService {
  userPoints: UserPoints = {
    todayPoints: 0,
    todayGoalPoints: 0,
    allPoints: 0
  };

  constructor(private http: HttpClient) { }

  setUp(userPoints: UserPoints) {
    this.userPoints = userPoints;
  }
}
