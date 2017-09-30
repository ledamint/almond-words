import { Component } from '@angular/core';

import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'recommended-words',
  template: `
        <h2 [hidden]="wordsService.recommendedWords.length === 0">Recommended words</h2>
        <div class="recommended-words-wrapper">
          <div class="recommended-words">
            <a routerLink="/add-new-word/{{ recommendedWord[optionsService.learningLanguage] }}"
              class="recommended-word theme-color-hover-background-fourth"
              *ngFor="let recommendedWord of wordsService.recommendedWords"
                >{{ recommendedWord[optionsService.learningLanguage] }} - {{ recommendedWord[optionsService.familiarLanguage] }}</a>
          </div>
        </div>
        `,
  styleUrls: [ './recommended-words.component.scss' ]
})
export class RecommendedWordsComponent {
  constructor(public wordsService: WordsService,
              public optionsService: OptionsService) { }
}
