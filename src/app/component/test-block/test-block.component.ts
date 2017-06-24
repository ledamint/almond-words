import { Component, OnInit } from '@angular/core';

import { MainService }  from '../../service/main.service';
import { TestWordsService }  from '../../service/test-words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'test-block',
  template: `
        <span class="origin-word">{{ testWordsService.testingWord[mainService.mainLanguage] }}</span>
        <router-outlet (activate)="onActivate($event)"></router-outlet>
        <div class="side-panel">
            <a routerLink="/test/choose-translation" routerLinkActive="active" class="side-panel__item">easy</a>
            <a routerLink="/test/compose-translation" routerLinkActive="active" class="side-panel__item">medium</a>
            <a routerLink="/test/write-translation" routerLinkActive="active" class="side-panel__item">hard</a>
            <div class="side-panel__item" (click)="changeLanguages()">switch</div>
        </div>
    `,
  styleUrls: ['./test-block.component.scss']
})
export class TestBlock implements OnInit {
  constructor(private mainService: MainService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService) {  }

  ngOnInit() {
    this.eventsService.translationCorrect$.subscribe(() => {
      this.testWordsService.changeTestingWord();
      this.eventsService.onNewRound();
    });
  }

  onActivate(Component) {
    this.eventsService.onNewRound();
  }

  changeLanguages() {
    this.mainService.changeLanguages();
    this.eventsService.onNewRound();
  }
}
