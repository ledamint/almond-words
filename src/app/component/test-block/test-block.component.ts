import { Component, OnInit } from '@angular/core';

import { MainService }  from '../../service/main.service';
import { TestWordsService }  from '../../service/test-words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'test-block',
  template: `
        <span class="origin-word">{{ testWordsService.currentTestingWord[mainService.mainLanguage] }}</span>
        <router-outlet (activate)="onActivate()"></router-outlet>
    `,
  styleUrls: ['./test-block.component.scss']
})
export class TestBlock implements OnInit {
  constructor(private mainService: MainService,
              private testWordsService: TestWordsService,
              private eventsService: EventsService) {  }

  ngOnInit() {

  }

  onActivate() {
    this.eventsService.onNewRound();
  }

  changeLanguages() {
    this.mainService.changeLanguages();
    this.eventsService.onNewRound();
  }
}
