import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ResultTestAnswer } from './test-words.service';
import { Message } from './interface/interfaces';

@Injectable()
export class EventsService {
  private newRoundSubject = new Subject<void>();
  private enterAnswerSubject = new Subject<ResultTestAnswer>();
  private addNewWordSubject = new Subject<void>();
  private showMessageSubject = new Subject<Message>();
  private serverErrorSubject = new Subject<any>();

  newRound$ = this.newRoundSubject.asObservable();
  enterAnswer$ = this.enterAnswerSubject.asObservable();
  addNewWord$ = this.addNewWordSubject.asObservable();
  showMessage$ = this.showMessageSubject.asObservable();
  serverError$ = this.serverErrorSubject.asObservable();

  onNewRound() {
    this.newRoundSubject.next();
  }

  onEnterAnswer(resultTestAnswer: ResultTestAnswer) {
    this.enterAnswerSubject.next(resultTestAnswer);
  }

  onAddNewWord() {
    this.addNewWordSubject.next();
  }

  onShowMessage(message: Message) {
    this.showMessageSubject.next(message);
  }

  // TODO add type
  onServerError(err) {
    this.serverErrorSubject.next(err);
  }
}
