import { Component } from '@angular/core';

import { TestWordsService } from 'app/service/test-words.service';

@Component({
  selector: 'test-block',
  template: `
        <span class="origin-word">{{ testWordsService.currentTestingWord.familiarWord }}</span>
        <router-outlet></router-outlet>
        <div class="side-panel">
            <a routerLink="/cards" class="side-panel__item">cancel</a>
        </div>`,
  styleUrls: ['./test-block.component.scss']
})
export class TestBlockComponent {
  constructor(public testWordsService: TestWordsService) { }
}
