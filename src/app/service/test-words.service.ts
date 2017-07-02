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
  rightAnswers: Word[] = [];
  wrongAnswers: Word[] = [];
  currentTestingWord: Word = {
    english: '',
    russian: ''
  };
  pointsForAnswerByTestId: number[] = [1, 2, 3];

  constructor(private mainService: MainService,
              private eventsService: EventsService,
              private router: Router) {
    this.eventsService.enterAnswer$.subscribe((resultTestAnswer) => {
      this.distributeAnswer(resultTestAnswer);
      this.calculateWordKnowledge(resultTestAnswer);
      this.onNewRound();
    });
  }

  startTest(card: Word[]) {
    this.testingWords = card.slice();
    this.clearAnswers();
    this.onNewRound();
  }

  finishTest() {
    this.mainService.distributeWords();
    this.router.navigateByUrl('/answers-result');
  }

  onNewRound() {
    if (this.testingWords.length > 0) {
      this.onNextTestingWord();
      this.eventsService.onNewRound();
    } else {
      this.finishTest();
    }
  }

  onNextTestingWord() {
    const randomTestingWordId = Math.floor(Math.random() * this.testingWords.length);
    this.currentTestingWord = this.testingWords[randomTestingWordId];
    this.testingWords.splice(randomTestingWordId, 1);
  }

  distributeAnswer(resultTestAnswer: ResultTestAnswer) {
    if (resultTestAnswer.isAnswerRight) this.rightAnswers.push(this.currentTestingWord);
    else this.wrongAnswers.push(this.currentTestingWord);
  }

  clearAnswers() {
    this.rightAnswers = [];
    this.wrongAnswers = [];
  }

  calculateWordKnowledge(resultTestAnswer: ResultTestAnswer) {
    const wordId = this.currentTestingWord._id;
    let points = this.pointsForAnswerByTestId[resultTestAnswer.testId];

    if (resultTestAnswer.isAnswerRight) points = points;
    else points = -1;

    this.mainService.updateWordKnowledge(wordId, points);
  }
}
