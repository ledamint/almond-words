import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './component/app/app.component';
import { Background }  from './component/background/background.component';
import { Cards }  from './component/cards/cards.component';
import { TestBlock }  from './component/test-block/test-block.component';
import { ChooseTranslation }  from './component/choose-translation/choose-translation.component';
import { ComposeTranslation }  from './component/compose-translation/compose-translation.component';
import { WriteTranslation }  from './component/write-translation/write-translation.component';

import { WordsService }  from './service/words.service';
import { EventsService }  from './service/events.service';

const appRoutes: Routes = [
  { path: 'cards', component: Cards },
  { path: 'test',
    component: TestBlock,
    children: [
      { path: 'choose-translation', component: ChooseTranslation },
      { path: 'compose-translation', component: ComposeTranslation },
      { path: 'write-translation', component: WriteTranslation },
      { path: '',
        redirectTo: '/test/choose-translation',
        pathMatch: 'full'
      },
    ] },
  { path: '',
    redirectTo: '/cards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent,
                  Background,
                  TestBlock,
                  ChooseTranslation,
                  ComposeTranslation,
                  WriteTranslation,
                  Cards ],
  bootstrap: [ AppComponent ],
  providers: [ WordsService, EventsService ]
})
export class AppModule { }
