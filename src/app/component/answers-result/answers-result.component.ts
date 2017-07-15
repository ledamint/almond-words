import { Component } from '@angular/core';

import { MainService } from '../../service/main.service';
import { TestWordsService } from '../../service/test-words.service';

@Component({
  selector: 'answers-result',
  template: `
      <h1>Results</h1>
      <div class="content">
        <div class="answers answers_right">
          <span *ngFor="let rightAnswer of testWordsService.rightAnswers" class="answers__answer">
            {{ rightAnswer[mainService.mainLanguage] }} - {{ rightAnswer[mainService.auxiliaryLanguage] }}
          </span>
        </div>
        <div class="answers answers_wrong">
          <span *ngFor="let wrongAnswer of testWordsService.wrongAnswers" class="answers__answer">
            {{ wrongAnswer[mainService.mainLanguage] }} - {{ wrongAnswer[mainService.auxiliaryLanguage] }}
          </span>
        </div>
      </div>
      <a routerLink="/cards" class="button">Cards</a>
    `,
    styleUrls: ['./answers-result.component.scss']
})
export class AnswersResult {
  constructor(private testWordsService: TestWordsService,
              private mainService: MainService) { }
}
