import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsService {
  private newRoundSubject = new Subject<string>();
  private translationCorrectSubject = new Subject<void>();
  private translationNotCorrectSubject = new Subject<void>();
  private addNewWordSubject = new Subject<void>();
  private serverErrorSubject = new Subject<void>();

  newRound$ = this.newRoundSubject.asObservable();
  translationCorrect$ = this.translationCorrectSubject.asObservable();
  translationNotCorrect$ = this.translationNotCorrectSubject.asObservable();
  addNewWord$ = this.addNewWordSubject.asObservable();
  serverError$ = this.serverErrorSubject.asObservable();

  onNewRound() {
    this.newRoundSubject.next();
  }

  onTranslationCorrect() {
    this.translationCorrectSubject.next();
  }

  onTranslationNotCorrect() {
    this.translationNotCorrectSubject.next();
  }

  onAddNewWord() {
    this.addNewWordSubject.next();
  }

  // TODO add type
  onServerError(err) {
    this.serverErrorSubject.next(err);
  }
}
