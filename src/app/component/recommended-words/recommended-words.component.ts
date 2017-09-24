import { Component, OnInit } from '@angular/core';

import { WordsService } from '../../service/words.service';

@Component({
  selector: 'recommended-words',
  template: `
        <h2 [hidden]="wordsService.recommendedWords.length === 0">Recommended words</h2>
        <div class="recommended-words-wrapper">
          <div class="recommended-words" [style.left]="left + 'px'">
            <a routerLink="/add-new-word/{{ recommendedWord }}" class="recommended-word theme-color-hover-background-fourth"
              *ngFor="let recommendedWord of wordsService.recommendedWords">{{ recommendedWord }}</a>
          </div>
        </div>
        `,
  styleUrls: [ './recommended-words.component.scss' ]
})
export class RecommendedWordsComponent implements OnInit {
  left: number = 0;

  constructor(public wordsService: WordsService) { }

  ngOnInit() {
    if (window.innerWidth > 480) {
      setTimeout(() => {
        const self = this;

        requestAnimationFrame(function step() {
          const averageLengthRecommendedWords = 4000;

          if (self.left < -averageLengthRecommendedWords) self.left = window.innerWidth;
          self.left -= 0.2;

          requestAnimationFrame(step);
        });
      }, 5000);
    }
  }
}
