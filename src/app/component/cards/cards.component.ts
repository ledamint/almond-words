import { Component, OnDestroy } from '@angular/core';

import { AuthorizationService } from '../../service/authorization.service';
import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';
import { MainInfoService } from 'app/service/main-info.service';
import { TestWordsService } from '../../service/test-words.service';

import { Word } from '../../service/interface/interfaces';

@Component({
  selector: 'cards',
  template: `
      <h1>Your {{ wordsService.activeWords.length > 0 ? wordsService.activeWords.length : '' }}
        word{{ wordsService.activeWords.length === 1 ? '' : 's' }}
        <span class="percent theme-color-text-second" [hidden]="wordsService.overallKnowledgePercent === 0"
        title="level of words knowledge">
          {{ wordsService.overallKnowledgePercent }}%</span>
      </h1>
      <div class="filter">
          <span class="button" [class.active]="optionsService.activeOptions.filter === filter"
            *ngFor="let filter of mainInfoService.options.filters" (click)="updateFilter(filter)">{{ filter }}</span>
      </div>
      <p class="description" [hidden]="wordsService.activeWords.length !== 0">You do not have words for this filter</p>
      <div class="cards">
          <div *ngFor="let card of wordsService.cards" class="card theme-color-background-third" [ngClass]="{ shake: card.isActive }">
              <a *ngFor="let word of card.words" title="{{ word.familiarWord }}"
                [style.opacity]="optionsService.activeOptions.isWordsOpacityActive ? 1 : word.knowledge/10" class="word"
                routerLink="/word/{{ word._id }}">{{ word.learningWord }}</a>
              <a routerLink="/test-choice" routerLinkActive="active" class="type-of-test theme-color-background-fourth"
                (click)="testWordsService.startTest(card.words)" (mouseover)="card.isActive = true"
                (mouseleave)="card.isActive = false">Test it</a>
          </div>
      </div>
      <div class="side-panel side-panel_left">
          <a routerLink="/add-new-word/" class="side-panel__item theme-color-border-main">add a new word</a>
            <a class="side-panel__item" [hidden]="wordsService.activeWords.length === 0"
              (click)="testWordsService.startFullAutoTest()" (mouseover)="setCardsAthective(true)"
              (mouseleave)="setCardsActive(false)">autotest</a>
      </div>
      <div class="side-panel side-panel_right">
          <a routerLink="/user-options" class="side-panel__item">options</a>
          <a class="side-panel__item" (click)="logout()">log out</a>
      </div>
    `,
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnDestroy {
  constructor(public authorizationService: AuthorizationService,
              public wordsService: WordsService,
              public optionsService: OptionsService,
              public mainInfoService: MainInfoService,
              public testWordsService: TestWordsService) { }

  logout() {
    if (confirm('Are you sure to log out?')) {
      this.authorizationService.logout();
    }
  }

  setCardsActive(isActive: boolean) {
    let delay = 0;

    this.wordsService.cards.forEach((card) => {
      setTimeout(() => card.isActive = isActive, delay);

      delay += 50;
    });
  }

  updateFilter(filter: string) {
    this.optionsService.updateFilter(filter);
    this.wordsService.updateWords();
    this.optionsService.updateActiveOptions();
  }

  ngOnDestroy() {
    this.setCardsActive(false);
  }
}
