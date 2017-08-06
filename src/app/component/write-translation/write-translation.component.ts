import { Component, OnInit, ElementRef } from '@angular/core';

import { WordsService } from '../../service/words.service';
import { TestWordsService } from '../../service/test-words.service';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'write-translation',
  template: `<input class="precise-answer theme-color-text-second-color" [class.incorrect]="isAnswerIncorrect" name="precise-answer"
               [(ngModel)]="answer" #preciseAnswer="ngModel" (keyup.enter)="checkAnswer(preciseAnswer.value)" >`,
  styleUrls: ['./write-translation.component.scss']
})
export class WriteTranslationComponent implements OnInit {
  answer: string = '';
  isAnswerIncorrect: boolean = false;

  constructor(private wordsService: WordsService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService,
              private elementRef: ElementRef) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
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

  setUpOneRound() {
    this.isAnswerIncorrect = false;
    this.answer = '';
    this.focusPreciseAnswer();
  }

  focusPreciseAnswer() {
    const preciseAnswerInput = this.elementRef.nativeElement.querySelector('.precise-answer');
    preciseAnswerInput.focus();
  }
}
