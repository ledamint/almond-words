import { Component, OnInit } from '@angular/core';

import { WordsService } from 'app/service/words.service';
import { TestWordsService } from 'app/service/test-words.service';
import { EventsService } from 'app/service/events.service';

import { Word } from 'app/service/interface/interfaces';

import { VariantOfAnswer, defaultAnswers } from './default-answers';

@Component({
  selector: 'choose-translation',
  template: `<div class="answers">
                 <button class="answer theme-color-background-third-color theme-color-hover-background-fourth-color"
                   *ngFor="let answer of answers"
                   (click)="checkAnswer(answer)">{{ answer }}</button>
             </div>`,
  styleUrls: ['./choose-translation.component.scss']
})
export class ChooseTranslationComponent implements OnInit {
  answers: string[] = [];
  variantsOfAnswers: VariantOfAnswer[];

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
    this.updateVariantsOfAnswers();
    this.updateAnswers();
  }

  checkAnswer(answer: string) {
    if (this.testWordsService.currentTestingWord.learningWord === answer) {
      this.eventsService.onEnterAnswer({ testId: 0, isAnswerRight: true });
    } else {
      this.eventsService.onEnterAnswer({ testId: 0, isAnswerRight: false });
    }
  }

  updateVariantsOfAnswers() {
    if (this.wordsService.activeWords.length > 3) {
      this.variantsOfAnswers = this.wordsService.activeWords.slice(-30);
    } else if (this.wordsService.allWords.length > 3) {
      this.variantsOfAnswers = this.wordsService.allWords.slice(-30);
    } else {
      this.variantsOfAnswers = defaultAnswers;
    }

    this.variantsOfAnswers = this.variantsOfAnswers.filter((variant) => {
      return variant._id !== this.testWordsService.currentTestingWord._id;
    });
  }

  updateAnswers() {
    this.answers = [];

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * this.variantsOfAnswers.length);
      const randomWord = this.variantsOfAnswers[randomIndex];

      this.answers.push(randomWord.learningWord);
      this.variantsOfAnswers.splice(randomIndex, 1);
    }

    const realTranslation = this.testWordsService.currentTestingWord.learningWord;
    this.answers.push(realTranslation);

    // shuffle
    this.answers.forEach((letter, i, answer) => {
      const randomNumber = Math.floor(Math.random() * answer.length);
      const randomLetter = answer[randomNumber];

      answer[randomNumber] = letter;
      answer[i] = randomLetter;
    });
  }
}
