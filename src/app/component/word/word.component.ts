import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { format } from 'date-fns';
import tts from 'app/speech-synthesis';

import { WordsService } from 'app/service/words.service';
import { OptionsService } from 'app/service/options.service';
import { Word } from 'app/service/interface/interfaces';

@Component({
  selector: 'word',
  template: `
        <h1>Word</h1>
        <form class="form" #wordForm="ngForm" action="" method="post" (ngSubmit)="updateWord(wordForm)">
            <h4 class="input-title">
                {{ optionsService.learningLanguage }}
                <img class="listen" src="assets/img/speaker-icon.svg" alt="listen" (click)="listenWord(wordForm.value['learning-word'])">
            </h4>
            <input class="text-input" type="text" name="learning-word" [ngModel]="word.learningWord" required>
            <h4 class="input-title">{{ optionsService.familiarLanguage }}</h4>
            <input class="text-input" type="text" name="familiar-word" [ngModel]="word.familiarWord" required>
            <span class="time">{{ time }}</span>
            <div class="buttons">
                <button class="button" type="submit" [disabled]="!wordForm.valid">Change</button>
                <button class="button button_red-hover" type="button" (click)="deleteWord(word)">Delete</button>
            </div>
            <div class="side-panel">
                <a routerLink="/cards" class="side-panel__item">cards</a>
            </div>
            <a class="direction right" (click)="goToWord('next')"></a>
            <a class="direction left" (click)="goToWord('previous')"></a>
        </form>
          `,
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  wordIndex: number;
  word: Word;
  time: string;

  constructor(public wordsService: WordsService,
              public optionsService: OptionsService,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.wordIndex = this.wordsService.activeWords.findIndex(word => word._id === params.get('id'));
        this.word = this.wordsService.activeWords[this.wordIndex];

        this.formatDate(this.word.time);
      });
  }

  updateWord(wordForm: NgForm) {
    const learningWord: string = wordForm.value['learning-word'].trim().toLowerCase();
    const familiarWord: string = wordForm.value['familiar-word'].trim().toLowerCase();

    const wordId = this.route.snapshot.params.id;
    const updatedData = {
      learningWord,
      familiarWord
    };

    this.wordsService.updateWord(wordId, updatedData, { text: 'Changed!'});
  }

  deleteWord(word: Word) {
    if (confirm('Are you sure to delete this word?')) {
      this.router.navigateByUrl('/cards');
      this.wordsService.deleteWord(word);
    }
  }

  goToWord(direction: string) {
    let nextWordIndex = this.wordIndex;

    if (direction === 'next') nextWordIndex += 1;
    if (direction === 'previous') nextWordIndex -= 1;

    if (this.wordsService.activeWords.length > nextWordIndex && nextWordIndex > -1) {
      const nextWordId = this.wordsService.activeWords[nextWordIndex]._id;

      this.router.navigateByUrl(`word/${nextWordId}`);
    }
  }

  formatDate(date: Date) {
    this.time = format(date, 'MMM Do YY');
  }

  listenWord(word: string) {
    tts.speak(word);
  }
}
