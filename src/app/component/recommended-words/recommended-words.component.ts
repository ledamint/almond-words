import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'recommended-words',
  template: `
        <div class="recommended-words-wrapper" *ngIf="optionsService.isRecommendedWordsAvailable &&
          wordsService.recommendedWords.length !== 0" [ngClass]="{ 'hide-tablet': !router.url.includes('add-new-word') }">
          <div class="recommended-words">
            <a routerLink="/add-new-word/{{ recommendedWord[optionsService.learningLanguage] }}/{{ recommendedWord[optionsService.familiarLanguage] }}"
              class="recommended-word theme-color-hover-background-fourth"
              *ngFor="let recommendedWord of wordsService.recommendedWords"
                >{{ recommendedWord[optionsService.learningLanguage] }} - {{ recommendedWord[optionsService.familiarLanguage] }}</a>
          </div>
        </div>
        `,
  styleUrls: [ './recommended-words.component.scss' ]
})
export class RecommendedWordsComponent {
  constructor(public router: Router,
              public wordsService: WordsService,
              public optionsService: OptionsService) { }
}
