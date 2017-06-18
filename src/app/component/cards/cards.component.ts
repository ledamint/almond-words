import { Component, OnInit } from '@angular/core';

import { WordsService, Word }  from '../../service/words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'cards',
  template: `
      <h1>Your words</h1>
      <div class="cards">
        <div *ngFor="let card of wordsService.cards" class="card">
          <span *ngFor="let word of card" title="{{ word[wordsService.auxiliaryLanguage] }}" class="word">{{ word[wordsService.mainLanguage] }}
            <span class="delete" (click)="deleteWord(word)">delete</span>
          </span>
          <a routerLink="/test/choose-translation" routerLinkActive="active" class="type-of-test" (click)="wordsService.startTest(card)">Check it</a>
        </div>
      </div>
      <div class="side-panel">
          <a routerLink="/add-new-word" routerLinkActive="active" class="side-panel__item">add new word</a>
          <div class="side-panel__item" (click)="wordsService.changeLanguages()">switch</div>
      </div>
    `,
  styleUrls: ['./cards.component.scss']
})
export class Cards implements OnInit {

  constructor(private wordsService: WordsService,
              private eventsService: EventsService) { }

  ngOnInit() {

  }

  deleteWord(word: Word) {
    this.wordsService.deleteWord(word);
  }
}
