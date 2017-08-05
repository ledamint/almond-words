import { Component, OnInit } from '@angular/core';

import { OptionsService } from '../../service/options.service';

interface BackgroundLine {
  word: string;
  left: number;
  top: number;
}

@Component({
  selector: 'background',
  template: `
      <div class="background">
          <div *ngFor="let backgroundLine of backgroundLines" class="background-line theme-color-text"
            (click)="restartBackgroundLine(backgroundLine)"
            [style.left]="backgroundLine.left + '%'" [style.top]="backgroundLine.top + '%'"
            [hidden]="disableBackground">{{ backgroundLine.word }}</div>
      </div>`,
  styleUrls: [ './background.component.scss' ]
})
export class BackgroundComponent implements OnInit  {
  backgroundLines: BackgroundLine[] = [];
  disableBackground: boolean = false;
  sumOfLineClick: number = 0;
  backgroundInterval = null;

  constructor(private optionsService: OptionsService) {  }

  ngOnInit(): void {
    this.setUpBackgroundLines();
    this.setUpAnimation();
  }

  setUpBackgroundLines(): void {
    // for (let i = 5; i < 95; i += 3) {
    //   const backgroundLine: BackgroundLine = {
    //     word: '',
    //     left: 0,
    //     top: 0
    //   };
    //   const randomWord = this.mainService.words[Math.floor(Math.random() * this.mainService.words.length)].learningWord;
    //   backgroundLine.word = randomWord;
    //   backgroundLine.left = i;
    //   backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
    //
    //   this.backgroundLines.push(backgroundLine);
    // }
  }

  setUpAnimation() {
    this.backgroundInterval = setInterval(() => {
      this.backgroundLines.forEach((backgroundLine) => {
        backgroundLine.top += 0.1;
        if (backgroundLine.top > 100) backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
      });
    }, 50);
  }

  restartBackgroundLine(backgroundLine: BackgroundLine) {
    backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
    this.sumOfLineClick += 1;

    if (this.sumOfLineClick === 3) {
      this.disableBackground = true;
      clearInterval(this.backgroundInterval);
    }
  }
}
