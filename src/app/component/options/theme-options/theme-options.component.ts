import { Component } from '@angular/core';

import { OptionsService } from 'app/service/options.service';
import { MainInfoService } from 'app/service/main-info.service';

@Component({
  selector: 'theme-options',
  template: `
            <div class="themes">
                <h3>Color</h3>
                <span class="option-item button" [class.active]="optionsService.activeOptions.theme === theme"
                  *ngFor="let theme of mainInfoService.options.themes" (click)="updateTheme(theme)">{{ theme }}</span>
            </div>
            <div class="background" title="Falling words">
                <h3>Background</h3>
                <span class="option-item button" [class.active]="optionsService.activeOptions.isBackgroundActive"
                  (click)="toggleBackground()">active</span>
            </div>
            <div class="opacity" title="Turn off this option if you want words have different opacity depending of knowledge level">
                <h3>Words opacity</h3>
                <span class="option-item button" [class.active]="optionsService.activeOptions.isWordsOpacityActive"
                  (click)="toggleWordsOpacity()">active</span>
            </div>
          `,
  styleUrls: ['./theme-options.component.scss']
})
export class ThemeOptionsComponent {
  constructor(public mainInfoService: MainInfoService,
              public optionsService: OptionsService) { }

  updateTheme(theme: string) {
    this.optionsService.updateTheme(theme);
  }

  toggleBackground() {
    this.optionsService.toggleBackground();
  }

  toggleWordsOpacity() {
    this.optionsService.toggleWordsOpacity();
  }
}
