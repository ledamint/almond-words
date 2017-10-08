import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { EventsService } from './events.service';
import { OptionsService } from './options.service';

import { Board, Word, DecreaseTime, KnowledgeFilter, Sort, RecommendedWord } from './interface/interfaces';

interface Card {
  words: Word[];
  isActive: boolean;
}

@Injectable()
export class WordsService {
  allWords: Word[] = [];
  activeWords: Word[] = [];
  // TODO: change type
  recommendedWords: RecommendedWord[] = [];
  cards: Card[] = [];
  overallKnowledgePercent: number;

  constructor(private http: HttpClient,
              private eventsService: EventsService,
              private optionsService: OptionsService) { }

  setUp(board: Board) {
    this.allWords = board.words;
    this.activeWords = this.allWords;

    this.updateWords();
    if (this.optionsService.isRecommendedWordsAvailable && this.optionsService.activeOptions.isRecommendedWordsActive) {
      this.getRecommendedWords();
    }
  }

  // TODO: think about optimization
  updateWords() {
    this.filterKnowledge(this.optionsService.activeOptions.filter.knowledge);
    this.sortWords(this.optionsService.activeOptions.sort);
    this.distributeWords();
    this.calculateOverallKnowledge();
  }

  // TODO: move recommended to separate service
  getRecommendedWords() {
    this.http.get('recommended-words?random=1')
      .subscribe(
        (recommendedWords: RecommendedWord[]) => {
          this.recommendedWords = recommendedWords;
        },
        err => this.eventsService.onServerError(err)
      );
  }

  getAvailableWords(word: string) {
    return this.http.get(`https://api.datamuse.com/sug?s=${word}`);
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
        this.cards[cardId] = {
          words: [],
          isActive: false
        };
      }

      this.cards[cardId].words.push(word);
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

  translateWord(word: string) {
    const apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    const apiKey = 'trnsl.1.1.20170910T052245Z.2dcffa636619250a.1ae7a58bd70134c42f7ab907150584f2ed488d8f';

    return this.http.get(
      `${apiUrl}?key=${apiKey}&text=${word}&lang=${this.optionsService.learningLanguage}-${this.optionsService.familiarLanguage}`);
  }

  // TODO: move to server
  updateWordKnowledge(wordId: string, addingPoints: number) {
    const updatedWordIndex = this.allWords.findIndex((word) => wordId === word._id);
    const newKnowledgePoints = this.calculateEntirePoints(this.allWords[updatedWordIndex].knowledge, addingPoints);

    if (newKnowledgePoints === 10) {
      const decreaseTime: DecreaseTime = this.calculateDecreaseTime(updatedWordIndex);

      this.updateWord(wordId, { knowledge: newKnowledgePoints, decreaseTime });
    } else {
      this.updateWord(wordId, { knowledge: newKnowledgePoints });
    }
  }

  calculateDecreaseTime(updatedWordIndex: number): DecreaseTime {
    let datesToNextDecrease = 1;
    const nextDecreaseTime = new Date();

    if (this.allWords[updatedWordIndex].decreaseTime !== undefined) {
      datesToNextDecrease = this.allWords[updatedWordIndex].decreaseTime.datesToNextDecrease || 1;
    }

    nextDecreaseTime.setDate(new Date().getDate() + datesToNextDecrease);
    datesToNextDecrease *= 2;

    const decreaseTime = {
      datesToNextDecrease,
      time: nextDecreaseTime
    };

    return decreaseTime;
  }

  calculateEntirePoints(currentKnowledgePoints: number, addingKnowledgePoints: number) {
    let newKnowledgePoints;

    if (currentKnowledgePoints !== undefined) {
       newKnowledgePoints = currentKnowledgePoints + addingKnowledgePoints;
    } else {
      newKnowledgePoints = 1 + addingKnowledgePoints;
    }

    if (newKnowledgePoints > 10) newKnowledgePoints = 10;
    if (newKnowledgePoints < 1) newKnowledgePoints = 1;

    return newKnowledgePoints;
  }
}
