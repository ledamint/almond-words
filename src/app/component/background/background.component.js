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
var Background = (function () {
    function Background(wordsService) {
        this.wordsService = wordsService;
        this.backgroundLines = [];
        this.disableBackground = false;
        this.sumOfLineClick = 0;
        this.backgroundInterval = null;
    }
    Background.prototype.ngOnInit = function () {
        this.setUpBackgroundLines();
        this.setUpAnimation();
    };
    Background.prototype.setUpBackgroundLines = function () {
        for (var i = 5; i < 95; i += 3) {
            var backgroundLine = {
                word: '',
                left: 0,
                top: 0
            };
            var randomWord = this.wordsService.words[Math.floor(Math.random() * this.wordsService.words.length)]['english'];
            backgroundLine.word = randomWord;
            backgroundLine.left = i;
            backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
            this.backgroundLines.push(backgroundLine);
        }
    };
    Background.prototype.setUpAnimation = function () {
        var _this = this;
        this.backgroundInterval = setInterval(function () {
            _this.backgroundLines.forEach(function (backgroundLine) {
                backgroundLine.top += 0.1;
                if (backgroundLine.top > 100)
                    backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
            });
        }, 50);
    };
    Background.prototype.restartBackgroundLine = function (backgroundLine) {
        backgroundLine.top = -Math.floor((Math.random() * 200) + 1);
        this.sumOfLineClick += 1;
        if (this.sumOfLineClick === 3) {
            this.disableBackground = true;
            clearInterval(this.backgroundInterval);
        }
    };
    return Background;
}());
Background = __decorate([
    core_1.Component({
        selector: 'background',
        template: "\n      <div class=\"background\" [hidden]=\"disableBackground\">\n          <div *ngFor=\"let backgroundLine of backgroundLines\" class=\"background-line\" (click)=\"restartBackgroundLine(backgroundLine)\"\n          [style.left]=\"backgroundLine.left + '%'\" [style.top]=\"backgroundLine.top + '%'\">{{ backgroundLine.word }}</div>\n          <div class=\"change-theme\" (click)=\"wordsService.changeBackground()\">O</div>\n      </div>",
        styleUrls: ['./background.component.css']
    }),
    __metadata("design:paramtypes", [words_service_1.WordsService])
], Background);
exports.Background = Background;
//# sourceMappingURL=background.component.js.map