import { Injectable } from '@angular/core';

import { EventsService }  from './events.service';
import { Word } from './main.service'

@Injectable()
export class TestWordsService {
  testingWords: Word[] = [];
  currentTestingWord: Word = {
    english: '',
    russian: ''
  };
  sumOfPoints: number = 0;

  constructor(private eventsService: EventsService) {
    this.eventsService.translationCorrect$.subscribe((sumOfPoints) => {
      this.addPoints(sumOfPoints);
      this.changeTestingWord();
      this.eventsService.onNewRound();
    });

    this.eventsService.translationNotCorrect$.subscribe(() => {
      this.changeTestingWord();
      this.eventsService.onNewRound();
    });
  }

  startTest(card:  Word[]) {
    this.testingWords = card;
    this.changeTestingWord();
  }

  changeTestingWord() {
    if (this.testingWords.length > 0) {
      const randomTestingWordId = Math.floor(Math.random() * this.testingWords.length);
      this.currentTestingWord = this.testingWords[randomTestingWordId];
      this.testingWords.splice(randomTestingWordId, 1);
    } else {
      alert(this.sumOfPoints);
    }
  }

  addPoints(sumOfPoints) {
    this.sumOfPoints += sumOfPoints;
  }
}
