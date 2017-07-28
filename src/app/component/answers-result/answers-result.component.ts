import { Component } from '@angular/core';

import { WordsService } from '../../service/words.service';
import { TestWordsService } from '../../service/test-words.service';

@Component({
  selector: 'answers-result',
  template: `
      <h1>Results</h1>
      <div class="content">
        <div class="answers answers_right" [hidden]="testWordsService.rightAnswers.length === 0"
          [style.text-align]="testWordsService.wrongAnswers.length === 0 ? 'center' : 'right'">
          <h3>Right</h3>
          <span *ngFor="let rightAnswer of testWordsService.rightAnswers" class="answers__answer">
            {{ rightAnswer.learningWord }} - {{ rightAnswer.familiarWord }}
          </span>
        </div>
        <div class="answers answers_wrong" [hidden]="testWordsService.wrongAnswers.length === 0"
          [style.text-align]="testWordsService.rightAnswers.length === 0 ? 'center' : 'left'">
        <h3>Wrong</h3>
          <span *ngFor="let wrongAnswer of testWordsService.wrongAnswers" class="answers__answer">
            {{ wrongAnswer.learningWord }} - {{ wrongAnswer.familiarWord }}
          </span>
        </div>
      </div>
      <a routerLink="/test-choice" class="button" (click)="testWordsService.repeatTest()">Repeat test</a>
      <a routerLink="/test-choice" class="button button_wrong" [hidden]="testWordsService.wrongAnswers.length === 0"
        (click)="testWordsService.repeatWrongAnswersTest()">Repeat wrong</a>
      <div class="side-panel">
          <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
      </div>
    `,
    styleUrls: ['./answers-result.component.scss']
})
export class AnswersResult {
  constructor(private testWordsService: TestWordsService) { }
}
