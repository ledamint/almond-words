import { Component, OnInit } from '@angular/core';

import { WordsService } from '../../service/words.service';
import { TestWordsService } from '../../service/test-words.service';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'choose-translation',
  template: `<div class="answers">
                 <button class="answer button" *ngFor="let answer of answers" (click)="checkAnswer(answer)">{{ answer }}</button>
             </div>`,
  styleUrls: ['./choose-translation.component.scss']
})
export class ChooseTranslationComponent implements OnInit {
  answers: string[] = [];

  constructor(private wordsService: WordsService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.newRound$.subscribe(() => {
      this.setUpOneRound();
    });
  }

  setUpOneRound() {
    this.answers = [];

    const realTranslation = this.testWordsService.currentTestingWord.learningWord;

    // TODO remove endless cycle
    while (true) {
      const randomWord = this.wordsService.words[Math.floor(Math.random() * this.wordsService.words.length)];
      const randomTransaltion = randomWord.learningWord;

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
    if (this.testWordsService.currentTestingWord.learningWord === answer) {
      this.eventsService.onEnterAnswer({ testId: 0, isAnswerRight: true });
    } else {
      this.eventsService.onEnterAnswer({ testId: 0, isAnswerRight: false });
    }
  }
}
