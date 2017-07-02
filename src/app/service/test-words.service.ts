import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { EventsService }  from './events.service';
import { MainService, Word } from './main.service'

export interface ResultTestAnswer {
  testId: number;
  isAnswerRight: boolean;
}

@Injectable()
export class TestWordsService {
  testingWords: Word[] = [];
  currentTestingWord: Word = {
    english: '',
    russian: ''
  };
  pointsForAnswerByTestId: number[] = [1, 2, 3];

  constructor(private mainService: MainService,
              private eventsService: EventsService,
              private router: Router) {
    this.eventsService.enterAnswer$.subscribe((resultTestAnswer) => {
      this.calculateWordKnowledge(resultTestAnswer);
      this.onNewRound();
    });
  }

  startTest(card: Word[]) {
    this.testingWords = card.slice();
    this.onNewRound();
  }

  onNewRound() {
    if (this.testingWords.length > 0) {
      this.onNextTestingWord();
      this.eventsService.onNewRound();
    } else {      
      this.router.navigateByUrl('/');
    }
  }

  onNextTestingWord() {
    const randomTestingWordId = Math.floor(Math.random() * this.testingWords.length);
    this.currentTestingWord = this.testingWords[randomTestingWordId];
    this.testingWords.splice(randomTestingWordId, 1);
  }

  calculateWordKnowledge(resultTestAnswer: ResultTestAnswer) {
    const wordId = this.currentTestingWord._id;
    let points = this.pointsForAnswerByTestId[resultTestAnswer.testId];

    if (resultTestAnswer.isAnswerRight) points = points;
    else points = -points;

    this.mainService.updateWordKnowledge(wordId, points);

    // const wordIndex = this.mainService.words.findIndex((word) => {
    //   return wordId === word._id;
    // });
    //
    // this.mainService.words[wordIndex]
  }
}
