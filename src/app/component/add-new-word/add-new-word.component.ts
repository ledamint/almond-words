import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WordsService, Word }  from '../../service/words.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'add-new-word',
  template: `
          <h1>Add a new word</h1>
          <form class="new-word-form" #newWordForm="ngForm" action="" method="post" (ngSubmit)="addNewWord(newWordForm)">
            <input class="text-input" type="text" name="main-word" placeholder="{{ wordsService.mainLanguage }}" ngModel required>
            <input class="text-input" type="text" name="translation" placeholder="{{ wordsService.auxiliaryLanguage }}" ngModel required>
            <button class="button button-animate" type="submit" [disabled]="!newWordForm.valid">Submit</button>
          </form>
          <div class="side-panel">
              <a routerLink="/cards" routerLinkActive="active" class="side-panel__item">cards</a>
          </div>
          <div class="pop-up" [hidden]="isPopUpHidden">
            <h2>Added!</h2>
          </div>`,
  styleUrls: ['./add-new-word.component.scss']
})
export class AddNewWord implements OnInit {
  isPopUpHidden: boolean = true;

  constructor(private wordsService: WordsService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.addNewWord$
      .subscribe(() => {
        this.showPopUp();
      })
  }

  addNewWord(form: NgForm) {
    if (form.valid) {
      const mainWord = form.value['main-word'].trim().toLowerCase();
      const translation = form.value['translation'].trim().toLowerCase();

      const newWord: Word = {
        english: '',
        russian: ''
      };

      newWord[this.wordsService.mainLanguage] = mainWord;
      newWord[this.wordsService.auxiliaryLanguage] = translation;

      this.wordsService.addNewWord(newWord);
    }
  }

  showPopUp() {
    this.isPopUpHidden = false;

    setTimeout(() => {
      this.isPopUpHidden = true;
    }, 2000);
  }
}
