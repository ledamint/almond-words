import { Component, OnInit } from '@angular/core';

import { WordsService } from 'app/service/words.service';
import { TestWordsService } from 'app/service/test-words.service';
import { EventsService } from 'app/service/events.service';

@Component({
  selector: 'write-translation',
  template: `<input class="precise-answer text-input theme-color-text-second"
               [class.incorrect]="isAnswerIncorrect" name="precise-answer" [(ngModel)]="answer"
               #preciseAnswer="ngModel" (keyup.enter)="checkAnswer(preciseAnswer.value)" myAutofocus>`,
  styleUrls: ['./write-translation.component.scss']
})
export class WriteTranslationComponent implements OnInit {
  answer: string = '';
  isAnswerIncorrect: boolean = false;

  constructor(public wordsService: WordsService,
              public testWordsService: TestWordsService,
              public eventsService: EventsService) { }

  ngOnInit() {
    this.setUpOneRound();

    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.isAnswerIncorrect = false;
    this.answer = '';
  }

  checkAnswer(answer: string) {
    answer = answer.trim().toLowerCase();

    if (this.testWordsService.currentTestingWord.learningWord === answer) {
      this.isAnswerIncorrect = false;
      this.eventsService.onEnterAnswer({ testId: 2, isAnswerRight: true });
    } else {
      this.isAnswerIncorrect = true;
      this.eventsService.onEnterAnswer({ testId: 2, isAnswerRight: false });
    }
  }
}
