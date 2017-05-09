import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class EventsService {
  private newRoundSubject = new Subject<string>();
  private translationCorrectSubject = new Subject<void>();
  private translationNotCorrectSubject = new Subject<void>();

  newRound$ = this.newRoundSubject.asObservable();
  translationCorrect$ = this.translationCorrectSubject.asObservable();
  translationNotCorrect$ = this.translationNotCorrectSubject.asObservable();

  onNewRound() {
    this.newRoundSubject.next();
  }

  onTranslationCorrect() {
    this.translationCorrectSubject.next();
  }

  onTranslationNotCorrect() {
    this.translationNotCorrectSubject.next();
  }
}
