import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'about-us',
  template: `
        <h1>About us</h1>
        <div class="description theme-color-background-third">
            <p>
                This application helps people who want to learn new languages.
                It allows keeping, learning and testing words to expand your vocabulary.
            </p>
            <p>
                Words are divided into cards and you can sort and filter all of them.
                Every word has an own knowledge level which is calculated after every test. It decrease with time,
                so you do not have to think what you need to learn, aplication decides for you.
            </p>
            <p>All wishes and remarks please send to <a href="mailto:almondwords@gmail.com">almondwords@gmail.com</a><p>
        </div>
        <a class="button" (click)="location.back()">Enjoy!</a>
        `,
  styleUrls: [ './about-us.component.scss' ]
})
export class AboutUsComponent {
  constructor(public location: Location) { }
}
