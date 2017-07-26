import { Component } from '@angular/core';

import { AuthorizationService }  from '../../service/authorization.service';
import { MainService, Word }  from '../../service/main.service';
import { TestWordsService }  from '../../service/test-words.service';

@Component({
  selector: 'cards',
  template: `
      <h1>Your {{  mainService.words.length > 0 ? mainService.words.length : '' }} words</h1>
      <p class="description" [hidden]="mainService.words.length !== 0">You need to add new words</p>
      <div class="cards">
        <div *ngFor="let card of mainService.cards" class="card">
          <span *ngFor="let word of card" title="{{ word.familiarWord }}" [style.opacity]="word.knowledge/10" class="word">
            {{ word.learningWord }}
            <span class="delete" (click)="deleteWord(word)">delete</span>
          </span>
          <a routerLink="/test-choice" routerLinkActive="active" class="type-of-test" (click)="testWordsService.startTest(card)">Check it</a>
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
              private mainService: MainService,
              private testWordsService: TestWordsService) { }

  deleteWord(word: Word) {
    if (confirm('Are you sure to delete this word?')) {
      this.mainService.deleteWord(word);
    }
  }

  logout() {
    if (confirm('Are you sure to logout?')) {
      this.authorizationService.logout();
    }
  }
}
