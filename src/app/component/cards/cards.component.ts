import { Component, OnInit } from '@angular/core';

import { MainService, Word }  from '../../service/main.service';
import { TestWordsService }  from '../../service/test-words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'cards',
  template: `
      <h1>Your words</h1>
      <div class="cards">
        <div *ngFor="let card of mainService.cards" class="card">
          <span *ngFor="let word of card" title="{{ word[mainService.auxiliaryLanguage] }}" class="word">{{ word[mainService.mainLanguage] }}
            <span class="delete" (click)="deleteWord(word)">delete</span>
          </span>
          <a routerLink="/test/choose-translation" routerLinkActive="active" class="type-of-test" (click)="testWordsService.startTest(card)">Check it</a>
        </div>
      </div>
      <div class="side-panel">
          <a routerLink="/add-new-word" routerLinkActive="active" class="side-panel__item">add new word</a>
          <div class="side-panel__item" (click)="mainService.changeLanguages()">switch</div>
      </div>
    `,
  styleUrls: ['./cards.component.scss']
})
export class Cards implements OnInit {

  constructor(private mainService: MainService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService) { }

  ngOnInit() {

  }

  deleteWord(word: Word) {
    this.mainService.deleteWord(word);
  }
}
