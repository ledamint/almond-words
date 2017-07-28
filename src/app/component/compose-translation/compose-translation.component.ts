import { Component, OnInit } from '@angular/core';

import { WordsService }  from '../../service/words.service';
import { TestWordsService }  from '../../service/test-words.service';
import { EventsService }  from '../../service/events.service';

interface WordLetter {
  letter: string;
  checked: boolean;
}

@Component({
  selector: 'compose-translation',
  template: `<div class="letters letters_main-word">
                 <div class="letter" [class.checked]="testingWordLetter.checked" *ngFor="let testingWordLetter of testingWordLetters">
                      {{ testingWordLetter.letter }}
                  </div>
             </div>
             <div class="letters letters_answer">
                 <div class="letter" [class.selected]="answerLetter.checked" *ngFor="let answerLetter of answerLetters" (click)="checkLetter(answerLetter)">
                     {{ answerLetter.letter }}
                 </div>
             </div>`,
  styleUrls: ['./compose-translation.component.scss']
})
export class ComposeTranslation implements OnInit {
  lettersOfTestingWord: string[];
  testingWordLetters: WordLetter[] = [];
  answerLetters: WordLetter[] = [];
  checkingLetterIndex: number = 0;

  constructor(private wordsService: WordsService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
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
      this.eventsService.onEnterAnswer({ testId: 1, isAnswerRight: false });
    }

    if (this.checkingLetterIndex === this.lettersOfTestingWord.length) {
      this.eventsService.onEnterAnswer({ testId: 1, isAnswerRight: true });
    }
  }
}
