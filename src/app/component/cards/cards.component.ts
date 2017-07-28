import { Component } from '@angular/core';

import { AuthorizationService }  from '../../service/authorization.service';
import { WordsService }  from '../../service/words.service';
import { TestWordsService }  from '../../service/test-words.service';

import { Word } from '../../service/interface/interfaces';

@Component({
  selector: 'cards',
  template: `
      <h1>Your {{  wordsService.words.length > 0 ? wordsService.words.length : '' }} words</h1>
      <p class="description" [hidden]="wordsService.words.length !== 0">You need to add new words or extend filter</p>
      <div class="cards">
        <div *ngFor="let card of wordsService.cards" class="card">
          <span *ngFor="let word of card" title="{{ word.familiarWord }}" [style.opacity]="word.knowledge/10" class="word">
            {{ word.learningWord }}
            <span class="delete" (click)="deleteWord(word)">delete</span>
          </span>
          <a routerLink="/test-choice" routerLinkActive="active" class="type-of-test" (click)="testWordsService.startTest(card)">Test it</a>
        </div>
      </div>
      <div class="side-panel">
          <a routerLink="/add-new-word" routerLinkActive="active" class="side-panel__item">add new word</a>
          <a routerLink="/options" routerLinkActive="active" class="side-panel__item">options</a>
          <a class="side-panel__item" (click)="logout()">logout</a>
      </div>
    `,
  styleUrls: ['./cards.component.scss']
})
export class Cards {
  constructor(private authorizationService: AuthorizationService,
              private wordsService: WordsService,
              private testWordsService: TestWordsService) { }
  deleteWord(word: Word) {
    if (confirm('Are you sure to delete this word?')) {
      this.wordsService.deleteWord(word);
    }
  }

  logout() {
    if (confirm('Are you sure to logout?')) {
      this.authorizationService.logout();
    }
  }
}
