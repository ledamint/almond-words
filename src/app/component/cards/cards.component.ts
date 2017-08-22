import { Component } from '@angular/core';

import { AuthorizationService } from '../../service/authorization.service';
import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';
import { TestWordsService } from '../../service/test-words.service';

import { Word } from '../../service/interface/interfaces';

@Component({
  selector: 'cards',
  template: `
      <h1>Your {{ wordsService.activeWords.length > 0 ? wordsService.activeWords.length : '' }}
        word{{ wordsService.activeWords.length === 1 ? '' : 's' }}
        <span class="percent theme-color-text-second-color" [hidden]="wordsService.overallKnowledgePercent === 0"
        title="level of words knowledge">
          {{ wordsService.overallKnowledgePercent }}%</span>
      </h1>
      <p class="description" [hidden]="wordsService.activeWords.length !== 0">You need to add new words or extend filter</p>
      <div class="cards">
          <div *ngFor="let card of wordsService.cards" class="card theme-color-border">
              <a *ngFor="let word of card" title="{{ word.familiarWord }}"
                [style.opacity]="optionsService.activeOptions.isWordsOpacityActive ? 1 : word.knowledge/10" class="word"
                routerLink="/word/{{ word._id }}">{{ word.learningWord }}</a>
              <a routerLink="/test-choice" routerLinkActive="active" class="type-of-test theme-color-border"
                (click)="testWordsService.startTest(card)">Test it</a>
          </div>
      </div>
      <div class="side-panel">
          <a routerLink="/add-new-word"  class="side-panel__item">add new word</a>
          <a routerLink="/user-options" class="side-panel__item">options</a>
          <a class="side-panel__item" (click)="logout()">logout</a>
      </div>
    `,
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  constructor(public authorizationService: AuthorizationService,
              public wordsService: WordsService,
              public optionsService: OptionsService,
              public testWordsService: TestWordsService) { }

  logout() {
    if (confirm('Are you sure to logout?')) {
      this.authorizationService.logout();
    }
  }
}
