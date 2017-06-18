import { Component, OnInit, ElementRef } from '@angular/core';

import { MainService }  from '../../service/main.service';
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
              private eventsService: EventsService,
              private elementRef: ElementRef) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  checkAnswer(answer: string) {
    answer = answer.toLowerCase();
    if (this.mainService.testingWord[this.mainService.auxiliaryLanguage] === answer) {
      this.eventsService.onTranslationCorrect();
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
