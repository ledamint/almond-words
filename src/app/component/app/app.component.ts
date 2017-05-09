import { Component } from '@angular/core';

import { WordsService }  from '../../service/words.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="wrapper" [class.blue-theme]="wordsService.themes[wordsService.currentThemeId] === 'blue' ? true : false">
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <background></background>
    </div>`,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  constructor(private wordsService: WordsService) {  }
}
