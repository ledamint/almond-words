import { Component, OnInit, ElementRef } from '@angular/core';

import { MainService }  from '../../service/main.service';
import { TestWordsService }  from '../../service/test-words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'write-translation',
  template: `<input class="precise-answer" [class.incorrect]="isAnswerIncorrect" name="precise-answer"
             [(ngModel)]="answer" #preciseAnswer="ngModel" (keyup.enter)="checkAnswer(preciseAnswer.value)" >`,
  styleUrls: ['./write-translation.component.scss']
})
export class WriteTranslation implements OnInit {
  answer: string = '';
  isAnswerIncorrect: boolean = false;

  constructor(private mainService: MainService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService,
              private elementRef: ElementRef) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  checkAnswer(answer: string) {
    answer = answer.toLowerCase();
    if (this.testWordsService.currentTestingWord[this.mainService.auxiliaryLanguage] === answer) {
      this.eventsService.onTranslationCorrect(3);
      this.isAnswerIncorrect = false;
    } else {
      this.isAnswerIncorrect = true;
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
