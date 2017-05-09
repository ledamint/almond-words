import { Component, OnInit } from '@angular/core';

import { WordsService }  from '../../service/words.service';
import { EventsService }  from '../../service/events.service';

interface WordLetter {
  letter: string;
  checked: boolean;
}

@Component({
  selector: 'compose-translation',
  template: `<div class="letters letters_main-word">
                 <div class="letter" [class.checked]="mainWordLetter.checked" *ngFor="let mainWordLetter of mainWordLetters"> {{ mainWordLetter.letter }}</div>
             </div>
             <div class="letters letters_answer">
                 <div class="letter" [class.selected]="answerLetter.checked" *ngFor="let answerLetter of answerLetters" (click)="checkLetter(answerLetter)">{{ answerLetter.letter }}</div>
             </div>`,
  styleUrls: ['./compose-translation.component.scss']
})
export class ComposeTranslation implements OnInit {
  lettersOfMainWord: string[];
  mainWordLetters: WordLetter[] = [];
  answerLetters: WordLetter[] = [];
  checkingLetterIndex: number;

  constructor(private wordsService: WordsService, private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.lettersOfMainWord = this.wordsService.mainWord[this.wordsService.auxiliaryLanguage].split('');
    this.checkingLetterIndex = 0;
    this.setUpMainWordLetters();
    this.setUpAnswerLetters();
  }

  setUpMainWordLetters() {
    this.mainWordLetters = [];

    this.lettersOfMainWord.forEach((letter) => {
      this.mainWordLetters.push({
        letter: letter,
        checked: false
      })
    });
  }

  setUpAnswerLetters() {
    this.answerLetters = [];
    var lettersOfMainWordRandom = this.lettersOfMainWord.slice();

    // shuffle
    lettersOfMainWordRandom.forEach((letter, i, answerLetters) => {
      const randomNumber = Math.floor(Math.random() * answerLetters.length);
      const randomLetter = answerLetters[randomNumber];

      answerLetters[randomNumber] = letter;
      answerLetters[i] = randomLetter;
    });

    lettersOfMainWordRandom.forEach((letter) => {
      this.answerLetters.push({
        letter: letter,
        checked: false
      })
    });
  }

  checkLetter(answerLetter: WordLetter) {
    if (answerLetter.letter === this.mainWordLetters[this.checkingLetterIndex]['letter']) {
      this.mainWordLetters[this.checkingLetterIndex]['checked'] = true;
      answerLetter.checked = true;
      this.checkingLetterIndex += 1;
    }

    if (this.checkingLetterIndex === this.lettersOfMainWord.length) this.eventsService.onTranslationCorrect();
  }
}
