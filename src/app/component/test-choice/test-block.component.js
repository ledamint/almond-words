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
var words_service_1 = require("../../service/main.service");
var events_service_1 = require("../../service/events.service");
var TestBlock = (function () {
    function TestBlock(mainService, eventsService, route) {
        this.mainService = mainService;
        this.eventsService = eventsService;
        this.route = route;
    }
    TestBlock.prototype.ngOnInit = function () {
        var _this = this;
        this.eventsService.translationCorrect$.subscribe(function () {
            _this.mainService.changeTestingWord();
            _this.eventsService.onNewRound();
        });
    };
    TestBlock.prototype.onActivate = function (Component) {
        if (this.route.url === '/write-translation') {
            Component.focusPreciseAnswer();
        }
        this.eventsService.onNewRound();
    };
    TestBlock.prototype.changeLanguages = function () {
        this.mainService.changeLanguages();
        this.eventsService.onNewRound();
    };
    return TestBlock;
}());
TestBlock = __decorate([
    core_1.Component({
        selector: 'test-block',
        template: "\n        <span class=\"origin-word\">{{ mainService.testingWord[mainService.mainLanguage] }}</span>\n        <router-outlet (activate)=\"onActivate($event)\"></router-outlet>\n        <div class=\"type-of-tests\">\n            <a routerLink=\"/test/choose-translation\" routerLinkActive=\"active\" class=\"type-of-test\">easy</a>\n            <a routerLink=\"/test/compose-translation\" routerLinkActive=\"active\" class=\"type-of-test\">medium</a>\n            <a routerLink=\"/test/write-translation\" routerLinkActive=\"active\" class=\"type-of-test\">hard</a>\n            <div class=\"type-of-test\" (click)=\"changeLanguages()\">switch</div>\n        </div>\n    ",
        styleUrls: ['./test-block.component.css']
    }),
    __metadata("design:paramtypes", [words_service_1.mainService,
        events_service_1.EventsService,
        router_1.Router])
], TestBlock);
exports.TestBlock = TestBlock;
//# sourceMappingURL=test-block.component.js.map