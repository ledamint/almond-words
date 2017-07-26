import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { EventsService } from './events.service'
import { OptionsService } from './options.service'

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
  filter: Filter;
}

interface Filter {
  knowledge: Knowledge[];
}

interface Knowledge {
  name: string;
  value: number[];
  isActive: boolean;
}

export interface Word {
  _id?: string;
  learningWord: string;
  familiarWord: string;
  time?: Date;
  knowledge?: number;
}

// TODO: create and move needed part to words service
@Injectable()
export class MainService {
  user: User;
  words: Word[] = [];
  cards: Array<Word[]> = [];

  learningLanguage: string = 'english';
  familiarLanguage: string = 'russian';

  constructor(private http: Http,
              private eventsService: EventsService,
              private optionsService: OptionsService) { }

  setUpApplication() {
    this.http.get('user')
      .map(res => res.json())
      .subscribe(
        (user) => {
          this.user = user;

          this.optionsService.setUp(user.options);
          this.setUpWords(user.boards[user.activeBoard].words);
        },
        err => this.eventsService.onServerError(err)
      );
  }

  setUpWords(words: Word[]) {
    this.words = words;

    if (this.optionsService.options === undefined) this.distributeWords();
    else {
      const activeSort = this.optionsService.options.sorts.find(sort => sort.isActive) || { value: 'time' };

      this.sortWords(activeSort.value);
    }
  }

  sortWords(key: string, isInverse: boolean = false) {
    if (key === 'knowledge') isInverse = true;

    this.optionsService.options.sorts.forEach((sort) => {
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

  filterKnowledge(knowledgeFilter: Knowledge[]) {
    knowledgeFilter = knowledgeFilter.filter(knowlege => knowlege.isActive);

    this.words = this.words.filter((word) => {
      let suitableFilter = false;

      knowledgeFilter.forEach((knowledge) => {
        if (word.knowledge >= knowledge.value[0] && word.knowledge <= knowledge.value[1]) {
          suitableFilter = true;
        }
      });

      return suitableFilter;
    });

    this.distributeWords();
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
