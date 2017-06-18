"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./component/app/app.component");
var background_component_1 = require("./component/background/background.component");
var cards_component_1 = require("./component/cards/cards.component");
var test_block_component_1 = require("./component/test-block/test-block.component");
var choose_translation_component_1 = require("./component/choose-translation/choose-translation.component");
var compose_translation_component_1 = require("./component/compose-translation/compose-translation.component");
var write_translation_component_1 = require("./component/write-translation/write-translation.component");
var words_service_1 = require("./service/main.service");
var events_service_1 = require("./service/events.service");
var appRoutes = [
    { path: 'cards', component: cards_component_1.Cards },
    { path: 'test',
        component: test_block_component_1.TestBlock,
        children: [
            { path: 'choose-translation', component: choose_translation_component_1.ChooseTranslation },
            { path: 'compose-translation', component: compose_translation_component_1.ComposeTranslation },
            { path: 'write-translation', component: write_translation_component_1.WriteTranslation },
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
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes)],
        declarations: [app_component_1.AppComponent,
            background_component_1.Background,
            test_block_component_1.TestBlock,
            choose_translation_component_1.ChooseTranslation,
            compose_translation_component_1.ComposeTranslation,
            write_translation_component_1.WriteTranslation,
            cards_component_1.Cards],
        bootstrap: [app_component_1.AppComponent],
        providers: [words_service_1.mainService, events_service_1.EventsService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map