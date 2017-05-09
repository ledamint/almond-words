import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService }  from '../../service/words.service';
import { EventsService }  from '../../service/events.service';
import { Word } from '../../service/words';

import axios from 'axios';

@Component({
  selector: 'cards',
  template: `
      <h1>Your words</h1>
      <div class="cards">
        <div *ngFor="let card of cards" class="card">
          <span *ngFor="let word of card" title="{{ word[wordsService.checkingLanguage] }}" class="word">{{ word[wordsService.auxiliaryLanguage] }}</span>
          <a routerLink="/test/choose-translation" routerLinkActive="active" class="type-of-test">Check it</a>
        </div>
      </div>
      <div class="side-panel">
          <span class="side-panel__item">add new word</span>
      </div>
    `,
  styleUrls: ['./cards.component.scss']
})
export class Cards implements OnInit {
  cards: Array<Word[]> = [];
  constructor(private wordsService: WordsService,
              private eventsService: EventsService,
              private route: Router) {  }

  ngOnInit() {
    this.distributeWords();
  }

  distributeWords() {
    let cardId: number = -1;

    this.wordsService.words.forEach((word, i) => {
      if (i % 10 === 0) {
        cardId += 1;
        this.cards[cardId] = [];
      }

      this.cards[cardId].push(word);
    });
  }
}
