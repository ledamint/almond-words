import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ResultTestAnswer } from './test-words.service'

@Injectable()
export class EventsService {
  private userDataIsReadySubject = new Subject<void>();
  private newRoundSubject = new Subject<void>();
  private enterAnswerSubject = new Subject<ResultTestAnswer>();
  private addNewWordSubject = new Subject<void>();
  private serverErrorSubject = new Subject<any>();

  userDataIsReady$ = this.userDataIsReadySubject.asObservable();
  newRound$ = this.newRoundSubject.asObservable();
  enterAnswer$ = this.enterAnswerSubject.asObservable();
  addNewWord$ = this.addNewWordSubject.asObservable();
  serverError$ = this.serverErrorSubject.asObservable();

  onUserDataIsReady() {
    this.userDataIsReadySubject.next();
  }

  onNewRound() {
    this.newRoundSubject.next();
  }

  onEnterAnswer(resultTestAnswer: ResultTestAnswer) {
    this.enterAnswerSubject.next(resultTestAnswer);
  }

  onAddNewWord() {
    this.addNewWordSubject.next();
  }

  // TODO add type
  onServerError(err) {
    this.serverErrorSubject.next(err);
  }
}
