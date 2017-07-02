import { Component, OnInit } from '@angular/core';

import { MainService }  from '../../service/main.service';
import { TestWordsService }  from '../../service/test-words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'choose-translation',
  template: `<div class="answers">
                <button class="answer" *ngFor="let answer of answers" (click)="checkAnswer(answer)">{{ answer }}</button>
             </div>`,
  styleUrls: ['./choose-translation.component.scss']
})
export class ChooseTranslation implements OnInit {
  answers: string[] = [];

  constructor(private mainService: MainService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.answers = [];

    const realTranslation = this.testWordsService.currentTestingWord[this.mainService.auxiliaryLanguage];

    while (true) {
      const randomWord = this.mainService.words[Math.floor(Math.random() * this.mainService.words.length)];
      const randomTransaltion = randomWord[this.mainService.auxiliaryLanguage];

      if (this.answers.indexOf(randomTransaltion) === -1) {
        if (randomTransaltion !== realTranslation) {
          this.answers.push(randomTransaltion);
        }
      }

      if (this.answers.length === 4) break;
    }

    // insert real translation
    this.answers[Math.floor(Math.random() * 4)] = realTranslation;
  }

  checkAnswer(answer: string) {
    if (this.testWordsService.currentTestingWord[this.mainService.auxiliaryLanguage] === answer) {
      this.eventsService.onEnterAnswer({ testId: 0, isAnswerRight: true });
    } else {
      this.eventsService.onEnterAnswer({ testId: 0, isAnswerRight: false });
    }
  }
}
