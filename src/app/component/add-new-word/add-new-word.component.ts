import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainService, Word }  from '../../service/main.service';
import { EventsService }  from '../../service/events.service';

@Component({
  selector: 'add-new-word',
  template: `
          <h1>Add a new word</h1>
          <form class="form" #newWordForm="ngForm" action="" method="post" (ngSubmit)="addNewWord(newWordForm)">
            <input class="text-input" type="text" name="main-word" placeholder="{{ mainService.learningLanguage }}" ngModel required>
            <input class="text-input" type="text" name="translation" placeholder="{{ mainService.familiarLanguage }}" ngModel required>
            <button class="button" type="submit" [disabled]="!newWordForm.valid">Submit</button>
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

  constructor(private mainService: MainService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.addNewWord$
      .subscribe(() => {
        this.showPopUp();
      })
  }

  addNewWord(form: NgForm) {
    const mainWord = form.value['main-word'].trim().toLowerCase();
    const translation = form.value['translation'].trim().toLowerCase();

    const newWord: Word = {
      learningWord: '',
      familiarWord: ''
    };

    newWord.learningWord = mainWord;
    newWord.familiarWord = translation;

    this.mainService.addNewWord(newWord);
    form.reset();
  }

  showPopUp() {
    this.isPopUpHidden = false;

    setTimeout(() => {
      this.isPopUpHidden = true;
    }, 2000);
  }
}
