import { Injectable } from '@angular/core';

// import { MainApplicationInfo, Options } from './interface/interfaces';

@Injectable()
export class SessionService {
  registrationEmail: string = '';
  registrationPassword: string = '';
  isWelcomePopupShowed: boolean = false;
}
