import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './component/app/app.component';
import { LoginComponent } from './component/login/login.component';
import { BackgroundComponent } from './component/background/background.component';
import { CardsComponent } from './component/cards/cards.component';
import { OptionsComponent } from './component/options/options.component';
import { AddNewWordComponent } from './component/add-new-word/add-new-word.component';
import { TestChoiceComponent } from './component/test-choice/test-choice.component';
import { TestBlockComponent } from './component/test-block/test-block.component';
import { AnswersResultComponent } from './component/answers-result/answers-result.component';
import { ChooseTranslationComponent } from './component/choose-translation/choose-translation.component';
import { ComposeTranslationComponent } from './component/compose-translation/compose-translation.component';
import { WriteTranslationComponent } from './component/write-translation/write-translation.component';

import { AuthorizationService } from './service/authorization.service';
import { MainService } from './service/main.service';
import { WordsService } from './service/words.service';
import { EventsService } from './service/events.service';
import { OptionsService } from './service/options.service';
import { TestWordsService } from './service/test-words.service';

// TODO move to separate file
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'user-options', component: OptionsComponent },
  { path: 'add-new-word', component: AddNewWordComponent },
  { path: 'test-choice', component: TestChoiceComponent },
  { path: 'test',
    component: TestBlockComponent,
    children: [
      { path: 'choose-translation', component: ChooseTranslationComponent },
      { path: 'compose-translation', component: ComposeTranslationComponent },
      { path: 'write-translation', component: WriteTranslationComponent }
    ] },
  { path: 'answers-result', component: AnswersResultComponent }
];

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent,
                  LoginComponent,
                  BackgroundComponent,
                  CardsComponent,
                  AddNewWordComponent,
                  OptionsComponent,
                  TestChoiceComponent,
                  TestBlockComponent,
                  AnswersResultComponent,
                  ChooseTranslationComponent,
                  ComposeTranslationComponent,
                  WriteTranslationComponent ],
  bootstrap: [ AppComponent ],
  providers: [ AuthorizationService,
               MainService,
               WordsService,
               EventsService,
               TestWordsService,
               OptionsService ]
})
export class AppModule { }
