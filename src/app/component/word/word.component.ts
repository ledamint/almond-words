import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { format } from 'date-fns';

import { WordsService } from 'app/service/words.service';
import { Word } from 'app/service/interface/interfaces';

@Component({
  selector: 'word',
  template: `
        <h1>Word</h1>
        <form class="form" #wordForm="ngForm" action="" method="post" (ngSubmit)="updateWord(wordForm)">
            <h4 class="input-title">{{ wordsService.learningLanguage }}</h4>
            <input class="text-input" type="text" name="learning-word" [ngModel]="word.learningWord" required>
            <h4 class="input-title">{{ wordsService.familiarLanguage }}</h4>
            <input class="text-input" type="text" name="familiar-word" [ngModel]="word.familiarWord" required>
            <span class="time">{{ time }}</span>
            <div class="buttons">
                <button class="button" type="submit" [disabled]="!wordForm.valid">Change</button>
                <button class="button" (click)="deleteWord(word)">Delete</button>
            </div>
            <div class="side-panel">
                <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
            </div>
        </form>
          `,
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  word: Word;
  time: string;

  constructor(public wordsService: WordsService,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.word = this.wordsService.activeWords.find(word => word._id === params.get('id'));
        this.formatDate(this.word.time);
      });
  }

  updateWord(wordForm: NgForm) {
    this.router.navigateByUrl('/cards');

    const learningWord: string = wordForm.value['learning-word'].trim().toLowerCase();
    const familiarWord: string = wordForm.value['familiar-word'].trim().toLowerCase();

    const wordId = this.route.snapshot.params.id;
    const updatedData = {
      learningWord,
      familiarWord
    };

    this.wordsService.updateWord(wordId, updatedData);
  }

  deleteWord(word: Word) {
    if (confirm('Are you sure to delete this word?')) {
      this.router.navigateByUrl('/cards');
      this.wordsService.deleteWord(word);
    }
  }

  formatDate(date: Date) {
    this.time = format(date, 'MMM Do YY');
  }
}
