import { Component } from '@angular/core';

@Component({
  selector: 'test-choice',
  template: `
        <div class="test-choice">
            <a routerLink="/test/choose-translation" routerLinkActive="active" class="test-choice__item">easy</a>
            <a routerLink="/test/compose-translation" routerLinkActive="active" class="test-choice__item">medium</a>
            <a routerLink="/test/write-translation" routerLinkActive="active" class="test-choice__item">hard</a>
        </div>
        <div class="side-panel">
            <a routerLink="/cards" class="side-panel__item">cards</a>
        </div>`,
    styleUrls: ['./test-choice.component.scss']
})
export class TestChoiceComponent { }
