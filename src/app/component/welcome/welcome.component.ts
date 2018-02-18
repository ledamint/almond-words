import { Component } from '@angular/core';
import { setTimeout } from 'timers';

@Component({
  selector: 'welcome',
  template: `
    <div class="welcome" [class.inactive]="isOpacityInactive" *ngIf="isShowing">
      <div class="content">
        <p>
          Привет!
        </p>
        <p>
          <span class="theme-color-text-main">AlmondWords</span> - это приложение, которое позволяет тебе добавлять, тестировать и повторять новые слова.
          Оно отлично подходит для эффективного и удобного изучения новых языков. Это удобный и простой личный словарь с дополнительным функционалом.
        </p>
        <p>
          <b>Таким как:</b>
        </p>
        <p>
          Предлагает к изучению 3000 наиболее используемых слов в разных языках.
        </p>
        <p>
          Автоматически фильтрует слова на новые и которые нужно повторить. Время повторения рассчитывается по наиболее эффективной методике, позволяющей легко и непринужденно закреплять слова в памяти.
        </p>
        <p>
          Обладает автотестом, подбирающим уровень теста на основании уровня владения слов.
        </p>
        <p>
          Также ты сможешь пользоваться <a href="https://chrome.google.com/webstore/detail/almondwords/nmegbabcobddpflndffbclmfdbfhjbjp" target="_blank">расширением для браузера <img class="logo" src="assets/img/icon.png"></a>, которое позволяет переводить и добавлять слова на любых сайтах в твой личный словарь.
        </p>
        <button class="button theme-color-text-main" (click)="hideWelcome()">Уже регистрируюсь!</button>
      </div>
    </div>
  `,
  styleUrls: [ './welcome.component.scss' ]
})
export class WelcomeComponent {
  isOpacityInactive: boolean = false;
  isShowing: boolean = true;

  hideWelcome() {
    this.isOpacityInactive = true;
    setTimeout(() => this.isShowing = false, 1000);
  }
}
