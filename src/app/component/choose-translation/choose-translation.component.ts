import { Component, OnInit } from '@angular/core';

import { WordsService }  from '../../service/words.service';
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

  constructor(private wordsService: WordsService, private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.answers = [];

    const realTranslation = this.wordsService.mainWord[this.wordsService.auxiliaryLanguage];

    while (true) {
      const randomWord = this.wordsService.words[Math.floor(Math.random() * this.wordsService.words.length)];
      const randomTransaltion = randomWord[this.wordsService.auxiliaryLanguage];

      if (this.answers.indexOf(randomTransaltion) === -1) {
        if (randomTransaltion !== realTranslation) {
          this.answers.push(randomTransaltion);
        }
      }

      if (this.answers.length === 4) break;
    }

    // insert real translation
    this.answers[Math.floor(Math.random() * 3)] = realTranslation;
  }

  checkAnswer(answer: string) {
    if (this.wordsService.mainWord[this.wordsService.auxiliaryLanguage] === answer) {
      this.eventsService.onTranslationCorrect();
    }
  }
}
