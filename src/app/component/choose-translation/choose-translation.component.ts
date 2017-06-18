import { Component, OnInit } from '@angular/core';

import { MainService }  from '../../service/main.service';
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

  constructor(private mainService: MainService, private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.answers = [];

    const realTranslation = this.mainService.testingWord[this.mainService.auxiliaryLanguage];

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
    if (this.mainService.testingWord[this.mainService.auxiliaryLanguage] === answer) {
      this.eventsService.onTranslationCorrect();
    } else {
      this.eventsService.onTranslationNotCorrect();
    }
  }
}
