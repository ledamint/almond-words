import { Injectable } from '@angular/core';

import { Word, words } from './words';

@Injectable()
export class WordsService {
  checkingLanguage: string = 'russian';
  auxiliaryLanguage: string = 'english';
  words: Word[] = words;
  mainWord: Word = words[0];
  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 0;

  changeMainWord() {
    this.mainWord = words[Math.floor(Math.random() * words.length)]
  }

  changeLanguages() {
    const temp = this.checkingLanguage;
    this.checkingLanguage = this.auxiliaryLanguage;
    this.auxiliaryLanguage = temp;
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
