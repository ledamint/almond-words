import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './component/app/app.component';
import { Login } from './component/login/login.component';
import { Background } from './component/background/background.component';
import { Cards } from './component/cards/cards.component';
import { Options } from './component/options/options.component';
import { AddNewWord } from './component/add-new-word/add-new-word.component';
import { TestChoice } from './component/test-choice/test-choice.component';
import { TestBlock } from './component/test-block/test-block.component';
import { AnswersResult } from './component/answers-result/answers-result.component';
import { ChooseTranslation } from './component/choose-translation/choose-translation.component';
import { ComposeTranslation } from './component/compose-translation/compose-translation.component';
import { WriteTranslation } from './component/write-translation/write-translation.component';

import { AuthorizationService } from './service/authorization.service';
import { MainService } from './service/main.service';
import { EventsService } from './service/events.service';
import { OptionsService } from './service/options.service';
import { TestWordsService } from './service/test-words.service';

// TODO move to separate file
const appRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'cards', component: Cards },
  { path: 'options', component: Options },
  { path: 'add-new-word', component: AddNewWord },
  { path: 'test-choice', component: TestChoice },
  { path: 'test',
    component: TestBlock,
    children: [
      { path: 'choose-translation', component: ChooseTranslation },
      { path: 'compose-translation', component: ComposeTranslation },
      { path: 'write-translation', component: WriteTranslation }
    ] },
  { path: 'answers-result', component: AnswersResult }
];

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent,
                  Login,
                  Background,
                  Cards,
                  AddNewWord,
                  Options,
                  TestChoice,
                  TestBlock,
                  AnswersResult,
                  ChooseTranslation,
                  ComposeTranslation,
                  WriteTranslation ],
  bootstrap: [ AppComponent ],
  providers: [ AuthorizationService, MainService, EventsService, TestWordsService, OptionsService ]
})
export class AppModule { }
