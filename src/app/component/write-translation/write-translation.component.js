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
var WriteTranslation = (function () {
    function WriteTranslation(wordsService, eventsService, elementRef) {
        this.wordsService = wordsService;
        this.eventsService = eventsService;
        this.elementRef = elementRef;
        this.answer = '';
        this.answerIncorrect = false;
    }
    WriteTranslation.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.newRound$.subscribe(function () {
            _this.setUpOneRound();
        });
    };
    WriteTranslation.prototype.checkAnswer = function (answer) {
        answer = answer.toLowerCase();
        if (this.wordsService.testingWord[this.wordsService.auxiliaryLanguage] === answer) {
            this.eventsService.onTranslationCorrect();
            this.answerIncorrect = false;
        }
        else {
            this.answerIncorrect = true;
        }
    };
    WriteTranslation.prototype.setUpOneRound = function () {
        this.answerIncorrect = false;
        this.answer = '';
        this.focusPreciseAnswer();
    };
    WriteTranslation.prototype.focusPreciseAnswer = function () {
        var preciseAnswerInput = this.elementRef.nativeElement.querySelector('.precise-answer');
        preciseAnswerInput.focus();
    };
    return WriteTranslation;
}());
WriteTranslation = __decorate([
    core_1.Component({
        selector: 'write-translation',
        template: "<input class=\"precise-answer\" [class.incorrect]=\"answerIncorrect\" name=\"precise-answer\"\n             [(ngModel)]=\"answer\" #preciseAnswer=\"ngModel\" (keyup.enter)=\"checkAnswer(preciseAnswer.value)\" >",
        styleUrls: ['./write-translation.component.css']
    }),
    __metadata("design:paramtypes", [words_service_1.WordsService,
        events_service_1.EventsService,
        core_1.ElementRef])
], WriteTranslation);
exports.WriteTranslation = WriteTranslation;
//# sourceMappingURL=write-translation.component.js.map