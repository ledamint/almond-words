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
var words_service_1 = require("../../service/words.service");
var events_service_1 = require("../../service/events.service");
var ComposeTranslation = (function () {
    function ComposeTranslation(wordsService, eventsService) {
        this.wordsService = wordsService;
        this.eventsService = eventsService;
        this.mainWordLetters = [];
        this.answerLetters = [];
    }
    ComposeTranslation.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.newRound$.subscribe(function () {
            _this.setUpOneRound();
        });
    };
    ComposeTranslation.prototype.setUpOneRound = function () {
        this.lettersOfMainWord = this.wordsService.mainWord[this.wordsService.auxiliaryLanguage].split('');
        this.checkingLetterIndex = 0;
        this.setUpMainWordLetters();
        this.setUpAnswerLetters();
    };
    ComposeTranslation.prototype.setUpMainWordLetters = function () {
        var _this = this;
        this.mainWordLetters = [];
        this.lettersOfMainWord.forEach(function (letter) {
            _this.mainWordLetters.push({
                letter: letter,
                checked: false
            });
        });
    };
    ComposeTranslation.prototype.setUpAnswerLetters = function () {
        var _this = this;
        this.answerLetters = [];
        var lettersOfMainWordRandom = this.lettersOfMainWord.slice();
        // shuffle
        lettersOfMainWordRandom.forEach(function (letter, i, answerLetters) {
            var randomNumber = Math.floor(Math.random() * answerLetters.length);
            var randomLetter = answerLetters[randomNumber];
            answerLetters[randomNumber] = letter;
            answerLetters[i] = randomLetter;
        });
        lettersOfMainWordRandom.forEach(function (letter) {
            _this.answerLetters.push({
                letter: letter,
                checked: false
            });
        });
    };
    ComposeTranslation.prototype.checkLetter = function (answerLetter) {
        if (answerLetter.letter === this.mainWordLetters[this.checkingLetterIndex]['letter']) {
            this.mainWordLetters[this.checkingLetterIndex]['checked'] = true;
            answerLetter.checked = true;
            this.checkingLetterIndex += 1;
        }
        if (this.checkingLetterIndex === this.lettersOfMainWord.length)
            this.eventsService.onTranslationCorrect();
    };
    return ComposeTranslation;
}());
ComposeTranslation = __decorate([
    core_1.Component({
        selector: 'compose-translation',
        template: "<div class=\"letters letters_main-word\">\n                 <div class=\"letter\" [class.checked]=\"mainWordLetter.checked\" *ngFor=\"let mainWordLetter of mainWordLetters\"> {{ mainWordLetter.letter }}</div>\n             </div>\n             <div class=\"letters letters_answer\">\n                 <div class=\"letter\" [class.selected]=\"answerLetter.checked\" *ngFor=\"let answerLetter of answerLetters\" (click)=\"checkLetter(answerLetter)\">{{ answerLetter.letter }}</div>\n             </div>",
        styleUrls: ['./compose-translation.component.css']
    }),
    __metadata("design:paramtypes", [words_service_1.WordsService, events_service_1.EventsService])
], ComposeTranslation);
exports.ComposeTranslation = ComposeTranslation;
//# sourceMappingURL=compose-translation.component.js.map