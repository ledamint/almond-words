"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var words_service_1 = require("../../service/words.service");
var events_service_1 = require("../../service/events.service");
var Cards = (function () {
    function Cards(wordsService, eventsService, route) {
        this.wordsService = wordsService;
        this.eventsService = eventsService;
        this.route = route;
        this.cards = [];
    }
    Cards.prototype.ngOnInit = function () {
        this.distributeWords();
    };
    Cards.prototype.distributeWords = function () {
        var _this = this;
        var cardId = -1;
        this.wordsService.words.forEach(function (word, i) {
            if (i % 10 === 0) {
                cardId += 1;
                _this.cards[cardId] = [];
            }
            _this.cards[cardId].push(word);
        });
    };
    return Cards;
}());
Cards = __decorate([
    core_1.Component({
        selector: 'cards',
        template: "\n      <h1>Your words</h1>\n      <div class=\"cards\">\n        <div *ngFor=\"let card of cards\" class=\"card\">\n          <span *ngFor=\"let word of card\" title=\"{{ word[wordsService.checkingLanguage] }}\" class=\"word\">{{ word[wordsService.auxiliaryLanguage] }}</span>\n          <a routerLink=\"/test/choose-translation\" routerLinkActive=\"active\" class=\"type-of-test\">Check it</a>\n        </div>\n      </div>\n    ",
        styleUrls: ['./cards.component.css']
    }),
    __metadata("design:paramtypes", [words_service_1.WordsService,
        events_service_1.EventsService,
        router_1.Router])
], Cards);
exports.Cards = Cards;
//# sourceMappingURL=cards.component.js.map