import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  template: `
          <h1>Login</h1>
          <form class="form" #loginForm="ngForm" action="" method="post" (ngSubmit)="checkLogin(loginForm)">
            <input class="text-input" type="text" name="name" placeholder="name" ngModel required>
            <input class="text-input" type="text" name="password" placeholder="password" ngModel required>
            <button class="button" type="submit" [disabled]="!loginForm.valid">Submit</button>
          </form>`,
  styleUrls: ['./login.component.scss']
})
export class Login {
  addNewWord(form: NgForm) {
    alert(form.value)
  }
}
