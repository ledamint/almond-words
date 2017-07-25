import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router'

import 'rxjs/add/operator/map';

import { EventsService } from './events.service'

export interface Word {
  learningWord: string;
  familiarWord: string;
  _id?: string;
  time?: Date;
  knowledge?: number;
}

export interface Sort {
  name: string;
  value: string;
  isActive: boolean;
}

export interface Options {
  sorts: Sort[];
}

@Injectable()
export class MainService {
  learningLanguage: string = 'english';
  familiarLanguage: string = 'russian';

  words: Word[] = [];
  cards: Array<Word[]> = [];

  // TODO: move to mongo and init options after login
  options: Options = {
    sorts: [
      {
        name: 'alphabet',
        value: 'learningWord',
        isActive: false
      },
      {
        name: 'time of addition',
        value: 'time',
        isActive: false
      },
      {
        name: 'knowledge',
        value: 'knowledge',
        isActive: false
      }
  ]};

  testingCard: Word[] = [];
  testingWord: Word = {
    learningWord: '',
    familiarWord: ''
  };

  themes: string[] = ['pink', 'blue'];
  currentThemeId: number = 1;

  constructor(private http: Http,
              private eventsService: EventsService,
              private router: Router) {
  }

  setUpWords() {
    this.http.get('words')
      .map(res => res.json())
      .subscribe(
        (data) => {
          this.words = data;
          this.distributeWords();
        },
        err => this.eventsService.onServerError(err)
      );
  }

  checkLogin(userData: Object = { }) {
    this.http.post('login', userData)
      .map(res => res.json())
      .subscribe(
        // TODO: divide requests
        (isLoginDone) => {
          if (isLoginDone) {
            this.setUpWords();
            this.router.navigateByUrl('/cards');
          }
          else this.router.navigateByUrl('/login');
        },
        (err) => {
          this.eventsService.onServerError(err);
          this.router.navigateByUrl('/login');
        }
      );
  }

  logout() {
    this.http.post('logout', { })
      .subscribe(
        () => this.router.navigateByUrl('/login'),
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

  sortWords(key: string, isInverse: boolean = false) {
    this.options.sorts.forEach((sort) => {
      if (sort.value === key) sort.isActive = true;
      else sort.isActive = false;
    });

    let a = 1;
    let b = -1

    if (isInverse) {
      a = -1;
      b = 1;
    }

    this.words.sort((word1, word2) => {
      if (word1[key] > word2[key]) return a;
      if (word1[key] < word2[key]) return b;
    });

    this.distributeWords();
  }

  addNewWord(newWord: Word) {
    this.http.post('words', newWord)
      .map((res) => res.json())
      .subscribe(
        (newWord) => {
          this.words.push(newWord);
          this.distributeWords();
          this.eventsService.onAddNewWord();
        },
        (err) => {
          this.eventsService.onServerError(err);

          setTimeout(() => {
            this.addNewWord(newWord);
          }, 600000);
        }
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

  updateWord(wordId: string, changes: Object) {
    this.http.put('words/' + wordId, changes)
      .map((res) => res.json())
      .subscribe(
        (updatedWord) => {
          const updatedWordIndex = this.words.findIndex((word) => wordId === word._id);
          this.words[updatedWordIndex] = updatedWord;
        },
        err => this.eventsService.onServerError(err)
      );
  }

  // TODO: move to server
  updateWordKnowledge(wordId: string, addingPoints: number) {
    const updatedWordIndex = this.words.findIndex((word) => wordId === word._id);
    const entirePoints = this.calculateEntirePoints(this.words[updatedWordIndex].knowledge, addingPoints);

    this.updateWord(wordId, { knowledge: entirePoints });
  }

  calculateEntirePoints(currentKnowledgePoints: number, addingKnowledgePoints: number) {
    if (currentKnowledgePoints !== undefined) {
      currentKnowledgePoints += addingKnowledgePoints;
    } else {
      currentKnowledgePoints = 1 + addingKnowledgePoints;
    }

    if (currentKnowledgePoints > 10) currentKnowledgePoints = 10;
    if (currentKnowledgePoints < 1) currentKnowledgePoints = 1;

    return currentKnowledgePoints;
  }

  changeBackground() {
    if (this.currentThemeId !== this.themes.length - 1) this.currentThemeId += 1;
    else this.currentThemeId = 0;
  }
}
