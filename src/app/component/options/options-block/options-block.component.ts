import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService } from 'app/service/words.service';
import { OptionsService } from 'app/service/options.service';
import { BackgroundService } from 'app/service/background.service';

import { KnowledgeFilter } from 'app/service/interface/interfaces';

// TODO: do background checkbox
@Component({
  selector: 'options',
  template: `
          <h1 class="theme-color-border">Options</h1>
          <router-outlet></router-outlet>
          <div class="buttons theme-color-border">
              <button class="button" (click)="submitOptions()">Submit</button>
          </div>
          <div class="side-panel">
              <a routerLink="/cards" routerLinkActive="active" class="side-panel__item" (click)="optionsService.resetChanges()">cards</a>
          </div>`,
  styleUrls: ['./options-block.component.scss']
})
export class OptionsBlockComponent {
  constructor(private wordsService: WordsService,
              private optionsService: OptionsService,
              private backgroundService: BackgroundService,
              private router: Router) { }

  submitOptions() {
    this.wordsService.updateWords();
    this.router.navigateByUrl('/cards');
    this.optionsService.updateActiveOptions();

    if (this.optionsService.activeOptions.isBackgroundActive !== this.optionsService.activeOptionsCopy.isBackgroundActive) {
      if (this.optionsService.activeOptions.isBackgroundActive) this.backgroundService.setUp();
      else this.backgroundService.reset();
    }
  }
}
