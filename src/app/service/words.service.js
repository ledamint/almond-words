"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var words_1 = require("./words");
var WordsService = (function () {
    function WordsService() {
        this.checkingLanguage = 'russian';
        this.auxiliaryLanguage = 'english';
        this.words = words_1.words;
        this.mainWord = words_1.words[0];
        this.themes = ['pink', 'blue'];
        this.currentThemeId = 0;
    }
    WordsService.prototype.changeMainWord = function () {
        this.mainWord = words_1.words[Math.floor(Math.random() * words_1.words.length)];
    };
    WordsService.prototype.changeLanguages = function () {
        var temp = this.checkingLanguage;
        this.checkingLanguage = this.auxiliaryLanguage;
        this.auxiliaryLanguage = temp;
    };
    WordsService.prototype.changeBackground = function () {
        if (this.currentThemeId !== this.themes.length - 1)
            this.currentThemeId += 1;
        else
            this.currentThemeId = 0;
    };
    return WordsService;
}());
WordsService = __decorate([
    core_1.Injectable()
], WordsService);
exports.WordsService = WordsService;
//# sourceMappingURL=words.service.js.map