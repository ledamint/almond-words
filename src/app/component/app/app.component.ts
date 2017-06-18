import { Component, OnInit } from '@angular/core';

import { WordsService }  from '../../service/words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="wrapper" [class.blue-theme]="wordsService.themes[wordsService.currentThemeId] === 'blue' ? true : false">
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <!-- <background></background> -->
        <div class="pop-up error" [hidden]="!err.status">
          <h2>A {{ err.status }} {{ err.statusText }} error has occured</h2>
        </div>
    </div>`,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  // TODO add type
  err: Object = { };

  constructor(private wordsService: WordsService,
              private eventService: EventsService) {  }

  ngOnInit() {
    this.wordsService.setUpWords();

    this.eventService.serverError$
      .subscribe(err => this.showError(err));
  }

  showError(err) {
    this.err = err;

    setTimeout(() => {
      this.err = { };
    }, 3000);
  }
}
