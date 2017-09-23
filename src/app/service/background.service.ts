import { Injectable } from '@angular/core';

import { WordsService } from './words.service';
import { OptionsService } from './options.service';

interface BackgroundLine {
  word: string;
  left: number;
  top: number;
}

@Injectable()
export class BackgroundService {
  backgroundLines: BackgroundLine[] = [];
  disableBackground: boolean = false;
  isAnimationActive: boolean;

  constructor(private optionsService: OptionsService,
              private wordsService: WordsService) { }

  setUp() {
    if (window.innerWidth > 480) {
      this.isAnimationActive = true;

      this.setUpBackgroundLines();
      this.setUpAnimation();
    }
  }

  reset() {
    this.isAnimationActive = false;
    this.backgroundLines = [];
  }

  setUpBackgroundLines() {
    if (this.wordsService.allWords.length !== 0) {
      for (let i = 5; i < 95; i += 3) {
        const backgroundLine: BackgroundLine = {
          word: '',
          left: 0,
          top: 0
        };
        const randomIndex = Math.floor(Math.random() * this.wordsService.allWords.length);
        const randomWord = this.wordsService.allWords[randomIndex].learningWord;

        backgroundLine.word = randomWord;
        backgroundLine.left = i;
        backgroundLine.top = -Math.floor((Math.random() * 200) + 20);

        this.backgroundLines.push(backgroundLine);
      }
    }
  }

  setUpAnimation() {
    const self = this;

    requestAnimationFrame(function backgroundStep() {
      self.backgroundLines.forEach((backgroundLine) => {
        backgroundLine.top += 0.04;
        if (backgroundLine.top > 100) backgroundLine.top = -Math.floor((Math.random() * 200) + 20);
      });

      if (self.isAnimationActive) requestAnimationFrame(backgroundStep);
    });
  }
}
