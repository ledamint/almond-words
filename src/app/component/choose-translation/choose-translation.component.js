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
var words_service_1 = require("../../service/main.service");
var events_service_1 = require("../../service/events.service");
var ChooseTranslation = (function () {
    function ChooseTranslation(mainService, eventsService) {
        this.mainService = mainService;
        this.eventsService = eventsService;
        this.answers = [];
    }
    ChooseTranslation.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.newRound$.subscribe(function () {
            _this.setUpOneRound();
        });
    };
    ChooseTranslation.prototype.setUpOneRound = function () {
        this.answers = [];
        var realTranslation = this.mainService.testingWord[this.mainService.auxiliaryLanguage];
        while (true) {
            var randomWord = this.mainService.words[Math.floor(Math.random() * this.mainService.words.length)];
            var randomTransaltion = randomWord[this.mainService.auxiliaryLanguage];
            if (this.answers.indexOf(randomTransaltion) === -1) {
                if (randomTransaltion !== realTranslation) {
                    this.answers.push(randomTransaltion);
                }
            }
            if (this.answers.length === 4)
                break;
        }
        // insert real translation
        this.answers[Math.floor(Math.random() * 3)] = realTranslation;
    };
    ChooseTranslation.prototype.checkAnswer = function (answer) {
        if (this.mainService.testingWord[this.mainService.auxiliaryLanguage] === answer) {
            this.eventsService.onTranslationCorrect();
        }
    };
    return ChooseTranslation;
}());
ChooseTranslation = __decorate([
    core_1.Component({
        selector: 'choose-translation',
        template: "<div class=\"answers\">\n                <button class=\"answer\" *ngFor=\"let answer of answers\" (click)=\"checkAnswer(answer)\">{{ answer }}</button>\n             </div>",
        styleUrls: ['./choose-translation.component.css']
    }),
    __metadata("design:paramtypes", [words_service_1.mainService, events_service_1.EventsService])
], ChooseTranslation);
exports.ChooseTranslation = ChooseTranslation;
//# sourceMappingURL=choose-translation.component.js.map