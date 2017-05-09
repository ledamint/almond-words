import { Component, OnInit, ElementRef } from '@angular/core';

import { WordsService }  from '../../service/words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'write-translation',
  template: `<input class="precise-answer" [class.incorrect]="answerIncorrect" name="precise-answer"
             [(ngModel)]="answer" #preciseAnswer="ngModel" (keyup.enter)="checkAnswer(preciseAnswer.value)" >`,
  styleUrls: ['./write-translation.component.scss']
})
export class WriteTranslation implements OnInit {
  answer: string = '';
  answerIncorrect: boolean = false;

  constructor(private wordsService: WordsService,
              private eventsService: EventsService,
              private elementRef: ElementRef) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  checkAnswer(answer: string) {
    answer = answer.toLowerCase();
    if (this.wordsService.mainWord[this.wordsService.auxiliaryLanguage] === answer) {
      this.eventsService.onTranslationCorrect();
      this.answerIncorrect = false;
    } else {
      this.answerIncorrect = true;
    }
  }

  setUpOneRound() {
    this.answerIncorrect = false;
    this.answer = '';
    this.focusPreciseAnswer();
  }

  focusPreciseAnswer() {
    const preciseAnswerInput = this.elementRef.nativeElement.querySelector('.precise-answer');
    preciseAnswerInput.focus();
  }
}
