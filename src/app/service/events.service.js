"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var EventsService = (function () {
    function EventsService() {
        this.newRoundSubject = new Subject_1.Subject();
        this.translationCorrectSubject = new Subject_1.Subject();
        this.translationNotCorrectSubject = new Subject_1.Subject();
        this.newRound$ = this.newRoundSubject.asObservable();
        this.translationCorrect$ = this.translationCorrectSubject.asObservable();
        this.translationNotCorrect$ = this.translationNotCorrectSubject.asObservable();
    }
    EventsService.prototype.onNewRound = function () {
        this.newRoundSubject.next();
    };
    EventsService.prototype.onTranslationCorrect = function () {
        this.translationCorrectSubject.next();
    };
    EventsService.prototype.onTranslationNotCorrect = function () {
        this.translationNotCorrectSubject.next();
    };
    return EventsService;
}());
EventsService = __decorate([
    core_1.Injectable()
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map