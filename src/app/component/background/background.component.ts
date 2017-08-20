import { Component } from '@angular/core';

import { BackgroundService } from '../../service/background.service';

@Component({
  selector: 'background',
  template: `
      <div class="background">
          <div *ngFor="let backgroundLine of backgroundService.backgroundLines" class="background-line theme-color-text-main-color"
            [style.left]="backgroundLine.left + '%'" [style.top]="backgroundLine.top + '%'"
            [hidden]="disableBackground">{{ backgroundLine.word }}</div>
      </div>`,
  styleUrls: [ './background.component.scss' ]
})
export class BackgroundComponent {
  constructor(public backgroundService: BackgroundService) { }
}
