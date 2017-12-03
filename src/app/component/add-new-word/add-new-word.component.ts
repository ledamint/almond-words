import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import shuffle from 'lodash.shuffle';

import tts from 'app/speech-synthesis';

import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';
import { EventsService } from '../../service/events.service';

import { RecommendedWord } from 'app/service/interface/interfaces';

interface AvailableWord {
  word: string;
}

@Component({
  selector: 'add-new-word',
  template: `
          <h1>Add a new word</h1>
          <form class="form" #newWordForm="ngForm" action="" method="post" (ngSubmit)="addNewWord(newWordForm)">
              <h4 class="input-title">
                  {{ optionsService.learningLanguage | translate}}
                  <img class="listen" src="assets/img/speaker-icon.svg" alt="listen" [hidden]="optionsService.learningLanguage !== 'en'"
                    (click)="listenWord(newWordForm.value['learning-word'])">
              </h4>
              <div class="input-wrapper">
                  <input class="text-input" type="text" name="learning-word" myAutofocus autocomplete="off"
                    (keyup)="keyUpLearningWordSubject.next(learningWord)" (focus)="setIsAvailableWordsActive(true)"
                    (blur)="setIsAvailableWordsActive(false)" [(ngModel)]="learningWord" required>
                  <div class="available-words theme-color-background-fourth" [hidden]="!isAvailableWordsActive">
                    <a routerLink="/add-new-word/{{ availableWord.word }}"
                      class="available-word" *ngFor="let availableWord of availableWords"
                      >{{ availableWord.word }}</a>
                  </div>
              </div>
              <h4 class="input-title">{{ optionsService.familiarLanguage | translate }}</h4>
              <div class="input-wrapper">
                  <input class="text-input" type="text" name="familiar-word" [(ngModel)]="familiarWord" required>
                  <a class="prompt prompt_right" href="https://translate.yandex.ru/?lang={{ optionsService.learningLanguage }}-{{
                    optionsService.familiarLanguage }}&text={{ learningWord }}" target="_blank">Yandex translate</a>
              </div>
              <button class="button" type="submit" [disabled]="!newWordForm.valid">Add</button>
          </form>
          <div class="side-panel">
              <a routerLink="/cards" class="side-panel__item">back</a>
          </div>`,
  styleUrls: ['./add-new-word.component.scss']
})
export class AddNewWordComponent implements OnInit {
  keyUpLearningWordSubject = new Subject<string>();
  keyUpLearningWord$ = this.keyUpLearningWordSubject.asObservable();

  learningWord: string = '';
  familiarWord: string = '';

  availableWords: AvailableWord[];
  isAvailableWordsActive: boolean = true;

  constructor(public wordsService: WordsService,
              public optionsService: OptionsService,
              public eventsService: EventsService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    if (window.innerWidth < 1024) {
      this.wordsService.recommendedWords = shuffle(this.wordsService.recommendedWords);
    }

    this.eventsService.addNewWord$
      .subscribe(() => {
        this.eventsService.onShowMessage({ text: 'Added!' });
      });

    this.keyUpLearningWord$
      .debounceTime(500)
      .distinctUntilChanged()
      .map((word: string) => word.toLowerCase())
      .subscribe((word: string) => {
        if (word !== '') {
          this.translateWord(word);

          if (word.length >= 2 && this.optionsService.learningLanguage === 'en') {
            this.getAvailableWords(word);
          }
        } else {
          this.familiarWord = '';
          this.availableWords = [];
        }
      });

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.availableWords = [];

        const learningWord = params.get('learning-word');
        const familiarWord = params.get('familiar-word');

        if (learningWord !== null && familiarWord !== null) {
          this.learningWord = learningWord;
          this.familiarWord = familiarWord;

          return;
        }

        if (learningWord !== null) {
          this.learningWord = learningWord;
          this.translateWord(this.learningWord);
        }
      });
  }

  addNewWord(newWordForm: NgForm) {
    const learningWord: string = newWordForm.value['learning-word'].trim().toLowerCase();
    const familiarWord: string = newWordForm.value['familiar-word'].trim().toLowerCase();

    const newWord = {
      learningWord,
      familiarWord
    };

    this.wordsService.addNewWord(newWord);
    this.learningWord = '';
    this.familiarWord = '';
    this.availableWords = [];
  }

  getAvailableWords(word: string) {
    this.wordsService.getAvailableWords(word)
      .subscribe(
        (availableWords: AvailableWord[]) => {
          this.availableWords = availableWords.slice(0, 7);
        },
        err => this.eventsService.onServerError(err)
      );
  }

  setIsAvailableWordsActive(isActive: boolean) {
    setTimeout(() => this.isAvailableWordsActive = isActive, 200);
  }

  translateWord(word: string) {
    this.wordsService.translateWord(word)
      .subscribe(
        (res: {text: string}) => {
          this.familiarWord = res.text[0];
        },
        err => this.eventsService.onServerError(err)
      );
  }

  listenWord(word: string) {
    tts.speak(word);
  }
}
