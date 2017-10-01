import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService } from 'app/service/words.service';
import { OptionsService } from 'app/service/options.service';
import { BackgroundService } from 'app/service/background.service';

import { KnowledgeFilter } from 'app/service/interface/interfaces';

@Component({
  selector: 'options',
  template: `
          <h1>Options</h1>
          <div class="top-nav-menu">
              <a class="button" routerLink="/user-options/words" routerLinkActive="active">words</a>
              <a class="button" routerLink="/user-options/theme" routerLinkActive="active">theme</a>
              <a class="button" routerLink="/user-options/account" routerLinkActive="active">account</a>
          </div>
          <router-outlet></router-outlet>
          <div class="buttons">
              <button class="button" [hidden]="this.router.url === '/user-options/account'" (click)="submitOptions()">Submit</button>
          </div>
          <div class="side-panel">
              <a routerLink="/cards" class="side-panel__item" (click)="optionsService.resetChanges()">cancel</a>
          </div>`,
  styleUrls: ['./options-block.component.scss']
})
export class OptionsBlockComponent implements OnInit {
  constructor(public wordsService: WordsService,
              public optionsService: OptionsService,
              public backgroundService: BackgroundService,
              public router: Router) { }

  ngOnInit() {
    this.optionsService.saveOptionsCopy();
  }

  submitOptions() {
    this.wordsService.updateWords();
    this.router.navigateByUrl('/cards');
    this.optionsService.updateActiveOptions();

    if (this.optionsService.activeOptions.isBackgroundActive !== this.optionsService.activeOptionsCopy.isBackgroundActive) {
      if (this.optionsService.activeOptions.isBackgroundActive) this.backgroundService.setUp();
      else this.backgroundService.reset();
    }

    if (this.optionsService.activeOptions.isRecommendedWordsActive !== this.optionsService.activeOptionsCopy.isRecommendedWordsActive) {
      if (this.optionsService.activeOptions.isRecommendedWordsActive) this.wordsService.getRecommendedWords();
      else this.wordsService.recommendedWords = [];
    }
  }
}
