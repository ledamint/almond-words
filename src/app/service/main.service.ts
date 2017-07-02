import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { EventsService } from './events.service'

export interface Word {
  english: string;
  russian: string;
  _id?: string;
  time?: Date;
  knowledge?: number;
}

@Injectable()
export class MainService {
  mainLanguage: string = 'english';
  auxiliaryLanguage: string = 'russian';

  words: Word[] = [];
  cards: Array<Word[]> = [];

  testingCard: Word[] = [];
  testingWord: Word = {
    english: '',
    russian: ''
  };

  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 1;

  constructor(private http: Http,
              private eventsService: EventsService) {
  }

  setUpWords() {
    this.http.get('words')
      .map(res => res.json())
      .subscribe((data) => {
        this.words = data;
        this.distributeWords();
      },
      err => this.eventsService.onServerError(err)
    );
  }

  distributeWords() {
    this.cards = [];
    let cardId: number = -1;

    this.words.forEach((word, i) => {
      if (i % 10 === 0) {
        cardId += 1;
        this.cards[cardId] = [];
      }

      this.cards[cardId].push(word);
    });
  }

  addNewWord(newWord: Word) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('words', newWord, options)
      .map((res) => res.json())
      .subscribe(
        (newWord) => {
          this.words.push(newWord);
          this.distributeWords();
          this.eventsService.onAddNewWord();
        },
        err => this.eventsService.onServerError(err)
      );
  }

  deleteWord(deletedWord: Word) {
    this.http.delete('words/' + deletedWord._id)
      .subscribe(
        () => {
          this.words = this.words.filter(word => word._id !== deletedWord._id);
          this.distributeWords();
        },
        err => this.eventsService.onServerError(err)
      );
  }

  updateWordKnowledge(wordId: string, points: number) {
    this.http.put('words/' + wordId, { points })
      .subscribe(
        (word) => {
          // this.words = this.words.filter(word => word._id !== deletedWord._id);
          // this.distributeWords();
          console.log(word);
        },
        err => this.eventsService.onServerError(err)
      );
  }

  changeLanguages() {
    const temp = this.mainLanguage;
    this.mainLanguage = this.auxiliaryLanguage;
    this.auxiliaryLanguage = temp;
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
