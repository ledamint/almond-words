import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WordsService } from '../../service/words.service';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'add-new-word',
  template: `
          <h1>Add a new word</h1>
          <form class="form" #newWordForm="ngForm" action="" method="post" (ngSubmit)="addNewWord(newWordForm)">
              <h4 class="input-title">{{ wordsService.learningLanguage }}</h4>
              <input class="text-input" type="text" name="learning-word" focus="true" ngModel required>
              <h4 class="input-title">{{ wordsService.familiarLanguage }}</h4>
              <input class="text-input" type="text" name="familiar-word" ngModel required>
              <button class="button" type="submit" [disabled]="!newWordForm.valid">Submit</button>
          </form>
          <div class="side-panel">
              <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
          </div>`,
  styleUrls: ['./add-new-word.component.scss']
})
export class AddNewWordComponent implements OnInit {
  constructor(private wordsService: WordsService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.addNewWord$
      .subscribe(() => {
        this.eventsService.onShowMessage({ text: 'Added!' });
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
    newWordForm.reset();
  }
}
