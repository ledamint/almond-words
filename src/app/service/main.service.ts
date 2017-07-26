import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { EventsService } from './events.service'

// TODO: move interfaces to separate file

interface User {
  _id: string;
  email: string;
  password: string;
  activeBoard: number;
  registrationTime: Date;
  boards: Board[];
  options: Options;
}

interface Board {
  learningLanguage: string;
  familiarLanguage: string;
  words: Word[];
}

interface Sort {
  name: string;
  value: string;
  isActive: boolean;
}

export interface Options {
  sorts: Sort[];
}

export interface Word {
  _id?: string;
  learningWord: string;
  familiarWord: string;
  time?: Date;
  knowledge?: number;
}

@Injectable()
export class MainService {
  user: User;
  learningLanguage: string = 'english';
  familiarLanguage: string = 'russian';

  words: Word[] = [];
  cards: Array<Word[]> = [];

  constructor(private http: Http,
              private eventsService: EventsService) { }

  setUpApplication() {
    this.http.get('user')
      .map(res => res.json())
      .subscribe(
        (user) => {
          this.user = user;
          this.words = user.boards[user.activeBoard].words;

          this.eventsService.onUserDataIsReady();
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
}
