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
  isAutoTest: boolean = false;

  constructor(private wordsService: WordsService,
    private eventsService: EventsService,
    private router: Router) {
    this.eventsService.enterAnswer$.subscribe((resultTestAnswer) => {
      this.distributeAnswer(resultTestAnswer);
      this.updateWordKnowledge(resultTestAnswer);
      this.onNewRound();
    });
  }

  startTest(card: Word[], isAutoTest = false) {
    this.isAutoTest = isAutoTest;
    this.testingWords = card.slice();
    this.clearAnswers();
    this.onNewRound();
  }

  startFullAutoTest() {
    this.isAutoTest = true;
    this.testingWords = [];
    const variantsOfTestingWords = this.wordsService.activeWords.slice();
    const testingWordsLength = variantsOfTestingWords.length < 10 ? variantsOfTestingWords.length : 10;

    for (let i = 0; i < testingWordsLength; i++) {
      const randomIndex = Math.floor(Math.random() * variantsOfTestingWords.length);

      this.testingWords.push(variantsOfTestingWords[randomIndex]);
      variantsOfTestingWords.splice(randomIndex, 1);
    }

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
    this.router.navigateByUrl('/answers-result');
  }

  onNewRound() {
    if (this.testingWords.length > 0) {
      this.setUpNextTestingWord();

      if (this.isAutoTest) {
        if (this.currentTestingWord.knowledge < 4) this.router.navigateByUrl('/test/choose-translation');
        else if (this.currentTestingWord.knowledge >= 4 &&
          this.currentTestingWord.knowledge < 8) this.router.navigateByUrl('/test/compose-translation');
        else this.router.navigateByUrl('/test/write-translation');
      }

      this.eventsService.onNewRound();
    } else {
      this.finishTest();
    }
  }

  setUpNextTestingWord() {
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
