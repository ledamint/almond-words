import { Component } from '@angular/core';

import { OptionsService } from 'app/service/options.service';

@Component({
  selector: 'theme-options',
  template: `          
            <div class="themes">
                <span class="option-item option-item_title">color:</span>
                <span class="option-item button" [class.active]="optionsService.activeOptions.theme === theme"
                  *ngFor="let theme of optionsService.options.themes" (click)="updateTheme(theme)">{{ theme }}</span>
            </div>
            <div class="background">
                <span class="option-item option-item_title">background:</span>
                <span class="option-item button" [class.active]="optionsService.activeOptions.isBackgroundActive"
                  (click)="toggleBackground()">active</span>
            </div>
          `,
  styleUrls: ['./theme-options.component.scss']
})
export class ThemeOptionsComponent {
  constructor(private optionsService: OptionsService) { }

  updateTheme(theme: string) {
    this.optionsService.updateTheme(theme);
  }

  toggleBackground() {
    this.optionsService.toggleBackground();
  }
}
