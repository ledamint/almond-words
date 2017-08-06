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
  backgroundInterval = null;

  constructor(private optionsService: OptionsService,
              private wordsService: WordsService) { }

  setUp() {
    this.setUpBackgroundLines();
    this.setUpAnimation();
  }

  reset() {
    clearInterval(this.backgroundInterval);
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
        backgroundLine.top = -Math.floor((Math.random() * 200) + 1);

        this.backgroundLines.push(backgroundLine);
      }
    }
  }

  setUpAnimation() {
    this.backgroundInterval = setInterval(() => {
      this.backgroundLines.forEach((backgroundLine) => {
        backgroundLine.top += 0.02;
        if (backgroundLine.top > 100) backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
      });
    }, 10);
  }
}
