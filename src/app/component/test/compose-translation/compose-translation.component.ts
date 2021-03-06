import { Component, OnInit } from '@angular/core';

import { WordsService } from 'app/service/words.service';
import { TestWordsService } from 'app/service/test-words.service';
import { EventsService } from 'app/service/events.service';

interface WordLetter {
  letter: string;
  checked: boolean;
}

@Component({
  selector: 'compose-translation',
  template: `<div class="letters letters_main-word">
                 <button class="letter theme-color-text-second theme-color-background-fourth"
                   [class.checked]="testingWordLetter.checked" *ngFor="let testingWordLetter of testingWordLetters"
                   >{{ testingWordLetter.letter }}</button>
             </div>
             <div class="letters letters_answer ">
                 <button class="letter theme-color-background-third theme-color-hover-background-fourth"
                   [class.selected]="answerLetter.checked" *ngFor="let answerLetter of answerLetters"
                   (click)="checkLetter(answerLetter)">{{ answerLetter.letter }}</button>
             </div>`,
  styleUrls: ['./compose-translation.component.scss']
})
export class ComposeTranslationComponent implements OnInit {
  lettersOfTestingWord: string[];
  testingWordLetters: WordLetter[] = [];
  answerLetters: WordLetter[] = [];
  checkingLetterIndex: number = 0;
  wasMistake: boolean = false;

  constructor(public wordsService: WordsService,
              public testWordsService: TestWordsService,
              public eventsService: EventsService) {  }

  ngOnInit() {
    this.setUpOneRound();

    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.wasMistake = false;
    this.lettersOfTestingWord = this.testWordsService.currentTestingWord.learningWord.split('');
    this.checkingLetterIndex = 0;
    this.setUptestingWordLetters();
    this.setUpAnswerLetters();
  }

  setUptestingWordLetters() {
    this.testingWordLetters = [];

    this.lettersOfTestingWord.forEach((letter) => {
      this.testingWordLetters.push({
        letter: letter,
        checked: false
      });
    });
  }

  setUpAnswerLetters() {
    this.answerLetters = [];
    const lettersOfTestingWordRandom = this.lettersOfTestingWord.slice();

    // shuffle
    lettersOfTestingWordRandom.forEach((letter, i, answerLetters) => {
      const randomNumber = Math.floor(Math.random() * answerLetters.length);
      const randomLetter = answerLetters[randomNumber];

      answerLetters[randomNumber] = letter;
      answerLetters[i] = randomLetter;
    });

    lettersOfTestingWordRandom.forEach((letter) => {
      this.answerLetters.push({
        letter: letter,
        checked: false
      });
    });
  }

  checkLetter(answerLetter: WordLetter) {
    if (answerLetter.letter === this.testingWordLetters[this.checkingLetterIndex]['letter']) {
      this.testingWordLetters[this.checkingLetterIndex]['checked'] = true;
      answerLetter.checked = true;
      this.checkingLetterIndex += 1;
    } else {
      this.wasMistake = true;
    }

    if (this.checkingLetterIndex === this.lettersOfTestingWord.length) {
      if (this.wasMistake) {
        this.eventsService.onEnterAnswer({ testId: 1, isAnswerRight: false });
      } else {
        this.eventsService.onEnterAnswer({ testId: 1, isAnswerRight: true });
      }
    }
  }
}
