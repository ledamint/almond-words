import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { EventsService } from './events.service';
import { WordsService } from './words.service';

import { Word } from './interface/interfaces';

export interface ResultTestAnswer {
  testId: number;
  isAnswerRight: boolean;
}

@Injectable()
export class TestWordsService {
  testingWords: Word[] = [];
  rightAnswers: Word[] = [];
  wrongAnswers: Word[] = [];
  currentTestingWord: Word;
  pointsForAnswerByTestId: number[] = [1, 2, 3];

  constructor(private wordsService: WordsService,
              private eventsService: EventsService,
              private router: Router) {
    this.eventsService.enterAnswer$.subscribe((resultTestAnswer) => {
      this.distributeAnswer(resultTestAnswer);
      this.updateWordKnowledge(resultTestAnswer);
      this.onNewRound();
    });
  }

  startTest(card: Word[]) {
    this.testingWords = card.slice();
    this.clearAnswers();
    this.onNewRound();
  }

  repeatTest() {
    this.testingWords = this.rightAnswers.concat(this.wrongAnswers);
    this.clearAnswers();
    this.onNewRound();
  }

  repeatWrongAnswersTest() {
    this.testingWords = this.wrongAnswers;
    this.clearAnswers();
    this.onNewRound();
  }

  finishTest() {
    this.wordsService.updateWords();
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

  updateWordKnowledge(resultTestAnswer: ResultTestAnswer) {
    const wordId = this.currentTestingWord._id;
    const points = this.calculateWordKnowledge(resultTestAnswer);

    this.wordsService.updateWordKnowledge(wordId, points);
  }

  calculateWordKnowledge(resultTestAnswer: ResultTestAnswer) {
    let points = this.pointsForAnswerByTestId[resultTestAnswer.testId];

    if (!resultTestAnswer.isAnswerRight) points = -1;

    return points;
  }
}
