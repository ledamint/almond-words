import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import tts from 'app/speech-synthesis';

import { WordsService } from '../../service/words.service';
import { OptionsService } from '../../service/options.service';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'add-new-word',
  template: `
          <h1>Add a new word</h1>
          <form class="form" #newWordForm="ngForm" action="" method="post" (ngSubmit)="addNewWord(newWordForm)">
              <h4 class="input-title">
                  {{ optionsService.learningLanguage }}
                  <img class="listen" src="assets/img/speaker-icon.svg" alt="listen"
                    (click)="listenWord(newWordForm.value['learning-word'])">
              </h4>
              <input class="text-input" type="text" name="learning-word" focus="true"
                (keyup)="keyUpLearningWordSubject.next(learningWord)" [(ngModel)]="learningWord" required>
              <h4 class="input-title">{{ optionsService.familiarLanguage }}</h4>
              <input class="text-input" type="text" name="familiar-word" [(ngModel)]="familiarWord" required>
              <button class="button" type="submit" [disabled]="!newWordForm.valid">Submit</button>
          </form>
          <div class="side-panel">
              <a routerLink="/cards" class="side-panel__item">cards</a>
          </div>`,
  styleUrls: ['./add-new-word.component.scss']
})
export class AddNewWordComponent implements OnInit {
  keyUpLearningWordSubject = new Subject<string>();
  keyUpLearningWord$ = this.keyUpLearningWordSubject.asObservable();

  learningWord: string;
  familiarWord: string;

  constructor(public wordsService: WordsService,
              public optionsService: OptionsService,
              public eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.addNewWord$
      .subscribe(() => {
        this.eventsService.onShowMessage({ text: 'Added!' });
      });

    this.keyUpLearningWord$
      .debounceTime(500)
      .subscribe((word) => {
        if (word !== '') {
          this.translateWord(word);
        } else {
          this.familiarWord = '';
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
  }

  translateWord(word: string) {
    this.wordsService.translateWord(word)
      .map((res) => res.json())
      .subscribe(
        (res) => {
          this.familiarWord = res.text[0];
        },
        err => this.eventsService.onServerError(err)
      );
  }

  listenWord(word: string) {
    tts.speak(word);
  }
}
