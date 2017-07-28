import { Component } from '@angular/core';

import { TestWordsService } from '../../service/test-words.service';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'test-block',
  template: `
        <span class="origin-word">{{ testWordsService.currentTestingWord.familiarWord }}</span>
        <router-outlet (activate)="onActivate()"></router-outlet>
        <div class="side-panel">
            <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
        </div>`,
  styleUrls: ['./test-block.component.scss']
})
export class TestBlockComponent {
  constructor(private testWordsService: TestWordsService,
              private eventsService: EventsService) {  }

  onActivate() {
    this.eventsService.onNewRound();
  }
}
