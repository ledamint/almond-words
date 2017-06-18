import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService }  from '../../service/main.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'test-block',
  template: `
        <span class="origin-word">{{ mainService.testingWord[mainService.mainLanguage] }}</span>
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
              private eventsService: EventsService,
              private route: Router) {  }

  ngOnInit() {
    this.eventsService.translationCorrect$.subscribe(() => {
      this.mainService.changeTestingWord();
      this.eventsService.onNewRound();
    });
  }

  onActivate(Component) {
    // if (this.route.url === '/write-translation') {
    //   Component.focusPreciseAnswer();
    // }

    this.eventsService.onNewRound();
  }

  changeLanguages() {
    this.mainService.changeLanguages();
    this.eventsService.onNewRound();
  }
}
