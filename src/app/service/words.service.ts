import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { EventsService } from './events.service';
import { OptionsService } from './options.service';

import { Board, Word, KnowledgeFilter, Sort } from './interface/interfaces';

@Injectable()
export class WordsService {
  allWords: Word[] = [];
  activeWords: Word[] = [];
  cards: Array<Word[]> = [];
  overallKnowledgePercent: number;

  constructor(private http: Http,
              private eventsService: EventsService,
              private optionsService: OptionsService) { }


  setUp(board: Board) {
    this.allWords = board.words;
    this.activeWords = this.allWords;

    this.updateWords();
  }

  // TODO: think about optimization
  updateWords() {
    this.filterKnowledge(this.optionsService.activeOptions.filter.knowledge);
    this.sortWords(this.optionsService.activeOptions.sort);
    this.distributeWords();
    this.calculateOverallKnowledge();
  }

  filterKnowledge(activeKnowledge: KnowledgeFilter[]) {
    if (activeKnowledge.length > 0 && activeKnowledge !== undefined) {
      this.activeWords = this.allWords.filter((word) => {
        let suitableFilter = false;

        activeKnowledge.forEach((knowledge) => {
          if (word.knowledge >= knowledge.value[0] && word.knowledge <= knowledge.value[1]) {
            suitableFilter = true;
          }
        });

        return suitableFilter;
      });
    } else this.activeWords = this.allWords;
  }

  sortWords(activeSort: string = 'time', isInverse: boolean = false) {
    if (activeSort === 'knowledge') isInverse = true;

    let a = 1;
    let b = -1;

    if (isInverse) {
      a = -1;
      b = 1;
    }

    this.activeWords.sort((word1, word2) => {
      if (word1[activeSort] > word2[activeSort]) return a;
      if (word1[activeSort] < word2[activeSort]) return b;
    });
  }

  distributeWords() {
    this.cards = [];
    let cardId: number = -1;

    this.activeWords.forEach((word, i) => {
      if (i % 10 === 0) {
        cardId += 1;
        this.cards[cardId] = [];
      }

      this.cards[cardId].push(word);
    });
  }

  calculateOverallKnowledge() {
    if (this.activeWords.length !== 0) {
      let overallKnowledge: number = 0;

      this.activeWords.forEach((word, i) => {
        overallKnowledge += word.knowledge;
      });

      // TODO: change 10 to max word knowledge from db
      const overallKnowledgePercent = overallKnowledge / this.activeWords.length * 10;

      this.overallKnowledgePercent = +overallKnowledgePercent.toFixed(1);
    } else {
      this.overallKnowledgePercent = 0;
    }
  }

  // TODO add type
  addNewWord(newWord) {
    this.http.post('words', newWord)
      .map((res) => res.json())
      .subscribe(
        (addedWord: Word) => {
          this.allWords.push(addedWord);
          this.updateWords();
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
          this.allWords = this.allWords.filter(word => word._id !== deletedWord._id);
          this.updateWords();
        },
        err => this.eventsService.onServerError(err)
      );
  }

  updateWord(wordId: string, changes: Object, message?: { text: string }) {
    this.http.put('words/' + wordId, changes)
      .map((res) => res.json())
      .subscribe(
        (updatedWord: Word) => {
          if (message !== undefined) this.eventsService.onShowMessage(message);

          const updatedWordIndex = this.allWords.findIndex((word) => wordId === word._id);
          this.allWords[updatedWordIndex] = updatedWord;

          this.updateWords();
        },
        err => this.eventsService.onServerError(err)
      );
  }

  // TODO: move to server
  updateWordKnowledge(wordId: string, addingPoints: number) {
    const updatedWordIndex = this.allWords.findIndex((word) => wordId === word._id);
    const entirePoints = this.calculateEntirePoints(this.allWords[updatedWordIndex].knowledge, addingPoints);

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
