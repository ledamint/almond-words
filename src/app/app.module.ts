import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FocusModule } from 'angular2-focus';

import { AppComponent } from './component/app/app.component';
import { RegistrationComponent } from './component/authorization/registration/registration.component';
import { LoginComponent } from './component/authorization/login/login.component';
import { ForgetPasswordComponent } from './component/authorization/forget-password/forget-password.component';
import { BackgroundComponent } from './component/background/background.component';
import { PopUpComponent } from './component/pop-up/pop-up.component';
import { CardsComponent } from './component/cards/cards.component';
import { WordComponent } from './component/word/word.component';
import { OptionsBlockComponent } from './component/options/options-block/options-block.component';
import { WordsOptionsComponent } from './component/options/words-options/words-options.component';
import { ThemeOptionsComponent } from './component/options/theme-options/theme-options.component';
import { AccountInformationComponent } from './component/options/account-information/account-information.component';
import { AddNewWordComponent } from './component/add-new-word/add-new-word.component';
import { TestChoiceComponent } from './component/test/test-choice/test-choice.component';
import { TestBlockComponent } from './component/test/test-block/test-block.component';
import { AnswersResultComponent } from './component/test/answers-result/answers-result.component';
import { ChooseTranslationComponent } from './component/test/choose-translation/choose-translation.component';
import { ComposeTranslationComponent } from './component/test/compose-translation/compose-translation.component';
import { WriteTranslationComponent } from './component/test/write-translation/write-translation.component';

import { AuthorizationService } from './service/authorization.service';
import { MainService } from './service/main.service';
import { EventsService } from './service/events.service';
import { WordsService } from './service/words.service';
import { OptionsService } from './service/options.service';
import { AccountInformationService } from './service/account-information.service';
import { BackgroundService } from './service/background.service';
import { TestWordsService } from './service/test-words.service';

// TODO move to separate file
const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'word/:id', component: WordComponent },
  {
    path: 'user-options',
    component: OptionsBlockComponent,
    children: [
      { path: 'words', component: WordsOptionsComponent },
      { path: 'theme', component: ThemeOptionsComponent },
      { path: 'account', component: AccountInformationComponent },
      { path: '', redirectTo: 'words', pathMatch: 'full' },
    ],
  },
  { path: 'add-new-word', component: AddNewWordComponent },
  { path: 'test-choice', component: TestChoiceComponent },
  {
    path: 'test',
    component: TestBlockComponent,
    children: [
      { path: 'choose-translation', component: ChooseTranslationComponent },
      { path: 'compose-translation', component: ComposeTranslationComponent },
      { path: 'write-translation', component: WriteTranslationComponent }
    ]
  },
  { path: 'answers-result', component: AnswersResultComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes), FocusModule.forRoot()],
  declarations: [AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgetPasswordComponent,
    BackgroundComponent,
    PopUpComponent,
    CardsComponent,
    WordComponent,
    AddNewWordComponent,
    OptionsBlockComponent,
    WordsOptionsComponent,
    ThemeOptionsComponent,
    AccountInformationComponent,
    TestChoiceComponent,
    TestBlockComponent,
    AnswersResultComponent,
    ChooseTranslationComponent,
    ComposeTranslationComponent,
    WriteTranslationComponent],
  bootstrap: [AppComponent],
  providers: [AuthorizationService,
    MainService,
    EventsService,
    WordsService,
    OptionsService,
    AccountInformationService,
    TestWordsService,
    BackgroundService]
})
export class AppModule { }
