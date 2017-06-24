import { Injectable } from '@angular/core';

import { Word } from './main.service'

@Injectable()
export class TestWordsService {
  testingCard: Word[] = [];
  testingWord: Word = {
    english: '',
    russian: ''
  };

  startTest(card:  Word[]) {
    this.testingCard = card;
    this.changeTestingWord();
  }

  changeTestingWord() {
    this.testingWord = this.testingCard[Math.floor(Math.random() * this.testingCard.length)];
  }
}
