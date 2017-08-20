import { Component } from '@angular/core';

@Component({
  selector: 'about-us',
  template: `
        <h1>About us</h1>
        <p>
            This application helps people who want to learn new languages.
            It allows keeping, learning, testing words and expand your vocabulary.
        </p>
        <p>
            Words are divided into cards and you can sort and filter all of them.
            Every word has a own level of knowledge which is calculated after every test.
            So you can work only with words which have not reached a high level.
        </p>
        <a class="button" routerLink="/registration">Enjoy!</a>

        `,
  styleUrls: [ './about-us.component.scss' ]
})
export class AboutUsComponent { }
