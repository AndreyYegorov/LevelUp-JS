webpackJsonp([1,4],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServerService = (function () {
    function ServerService(http) {
        this.http = http;
    }
    ServerService.prototype.signup = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json'
        });
        console.log(user);
        return this.http.post('http://localhost:3000/api/signup', user, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.login = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json'
        });
        console.log(user);
        return this.http.post('http://localhost:3000/api/login', user, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.logout = function () {
        return this.http.get('http://localhost:3000/api/logout')
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.getLoggedUser = function () {
        return this.http.get('http://localhost:3000/api/user')
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ServerService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], ServerService);
    return ServerService;
    var _a;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/server.service.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatService = (function () {
    function ChatService(http) {
        this.http = http;
    }
    ChatService.prototype.getHashes = function (message) {
        var hashMatches = message.match(/(^|\s)#[\wа-я]+/g);
        if (!hashMatches)
            return [];
        return hashMatches.map(function (el, index) {
            if (message.charAt(0) === '#' && index === 0)
                return el;
            return el.slice(1);
        });
    };
    ChatService.prototype.filterMessagesByHash = function (messages, hash) {
        return this.getMessagesAll()
            .map(function (res) {
            if (!hash) {
                return messages = res;
            }
            else {
                return messages = res.filter(function (el) { return el.hashes.find(function (elhash) { return elhash === hash; }); });
            }
        });
    };
    ChatService.prototype.getMessagesAll = function () {
        return this.http.get('http://localhost:3000/api/messages')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.addMessage = function (newMessage) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json'
        });
        console.log(newMessage);
        return this.http.post('http://localhost:3000/api/message', newMessage, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.upload = function (formData) {
        return this.http.post('http://localhost:3000/api/upload', formData)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.handleError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.message || error);
    };
    ChatService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], ChatService);
    return ChatService;
    var _a;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/chat.service.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DateService = (function () {
    function DateService() {
    }
    DateService.prototype.getCurrentDate = function () {
        var dateNow = new Date(), day = (dateNow.getDate() < 10) ? '0' + dateNow.getDate() : dateNow.getDate(), month = (dateNow.getMonth() + 1 < 10) ? '0' + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1, yearFull = dateNow.getFullYear(), hours = (dateNow.getHours() < 10) ? '0' + (dateNow.getHours()) : dateNow.getHours(), minutes = (dateNow.getMinutes() < 10) ? '0' + (dateNow.getMinutes()) : dateNow.getMinutes();
        return day + "." + month + "." + yearFull + " at " + hours + ":" + minutes;
    };
    DateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], DateService);
    return DateService;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/date.service.js.map

/***/ }),

/***/ 338:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 338;


/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(457);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/main.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Hi!');
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(524),
            styles: [__webpack_require__(520)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/app.component.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_chat_component__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login_component__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_chat_service__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_date_service__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_server_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_filter_pipe__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_highlight_pipe__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_transformMessage_pipe__ = __webpack_require__(462);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var appRoutes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_6__chat_chat_component__["a" /* ChatComponent */]
    },
    {
        path: 'signup', component: __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__["a" /* SignupComponent */]
    },
    {
        path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__chat_chat_component__["a" /* ChatComponent */],
                __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_filter_pipe__["a" /* FilterPipe */],
                __WEBPACK_IMPORTED_MODULE_13__pipes_highlight_pipe__["a" /* HighlightPipe */],
                __WEBPACK_IMPORTED_MODULE_14__pipes_transformMessage_pipe__["a" /* TransformMessage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__services_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_10__services_date_service__["a" /* DateService */],
                __WEBPACK_IMPORTED_MODULE_11__services_server_service__["a" /* ServerService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/app.module.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_chat_service__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_date_service__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_server_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatComponent = (function () {
    function ChatComponent(chatservice, dateservice, serverservice, location, http) {
        this.chatservice = chatservice;
        this.dateservice = dateservice;
        this.serverservice = serverservice;
        this.http = http;
        this.isLogged = false;
        this.imagesToUpload = [];
        this.title = 'It\'s our great chat!';
        this.location = location;
    }
    ChatComponent.prototype.getMessagesAll = function () {
        var _this = this;
        this.chatservice.getMessagesAll()
            .subscribe(function (messages) {
            console.log(messages);
            _this.messages = messages;
        });
    };
    ChatComponent.prototype.filterMessagesByHash = function (messages, hash) {
        var _this = this;
        this.chatservice.filterMessagesByHash(messages, hash)
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    ChatComponent.prototype.addMessage = function (messageText) {
        var _this = this;
        var date = this.dateservice.getCurrentDate(), userName = this.userName, hashes = this.chatservice.getHashes(messageText), avatarUrl = "http://api.adorable.io/avatars/50/" + userName + "@adorable.png", imageUrl = this.imagesToUpload.length ? "./assets/uploads/" + this.imagesToUpload[0]['name'] : '';
        var newMessage = {
            userName: userName,
            messageText: messageText,
            hashes: hashes,
            date: date,
            avatarUrl: avatarUrl,
            imageUrl: imageUrl
        };
        this.chatservice.addMessage(newMessage)
            .subscribe(function (message) {
            console.log(message);
            _this.messages.push(message);
        });
    };
    ChatComponent.prototype.upload = function () {
        var _this = this;
        var formData = new FormData(), files = this.imagesToUpload;
        if (files.length) {
            formData.append('image', files[0], files[0]['name']);
            this.chatservice.upload(formData)
                .subscribe(function (files) {
                console.log('files: ', files);
                _this.imagesToUpload = [];
            });
        }
    };
    ChatComponent.prototype.fileChangeEvent = function (fileInput) {
        this.imagesToUpload = fileInput.target.files;
    };
    ChatComponent.prototype.listenLocation = function () {
        var _this = this;
        if (decodeURI(location.hash))
            this.filterMessagesByHash(this.messages, decodeURI(location.hash));
        this.location.subscribe(function (ev) {
            if (ev.type === 'hashchange') {
                _this.filterMessagesByHash(_this.messages, decodeURI(location.hash));
            }
        });
    };
    ChatComponent.prototype.getLoggedUser = function () {
        var _this = this;
        this.serverservice.getLoggedUser()
            .then(function (user) {
            _this.isLogged = true;
            _this.userName = user.username;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ChatComponent.prototype.logout = function () {
        var _this = this;
        this.serverservice.logout()
            .then(function (user) {
            _this.isLogged = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ChatComponent.prototype.ngOnInit = function () {
        this.getLoggedUser();
        this.listenLocation();
        if (!decodeURI(location.hash))
            this.getMessagesAll();
    };
    ChatComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'chat',
            providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */], { provide: __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* HashLocationStrategy */] }],
            template: __webpack_require__(525),
            styles: [__webpack_require__(521)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_chat_service__["a" /* ChatService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_chat_service__["a" /* ChatService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_date_service__["a" /* DateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_date_service__["a" /* DateService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_server_service__["a" /* ServerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_server_service__["a" /* ServerService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === 'function' && _e) || Object])
    ], ChatComponent);
    return ChatComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/chat.component.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_server_service__ = __webpack_require__(130);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(serverservice, router) {
        this.serverservice = serverservice;
        this.router = router;
        this.user = {
            username: '',
            password: ''
        };
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.serverservice.login(this.user)
            .then(function (user) {
            console.log(user);
            _this.user.username = '';
            _this.user.password = '';
            _this.redirectToHome();
        })
            .catch(function (error) {
            console.log(error);
            _this.loginError = 'Login error. Please, try use another username or password.';
        });
    };
    LoginComponent.prototype.redirectToHome = function () {
        this.router.navigate(['/']);
    };
    LoginComponent.prototype.getLoggedUser = function () {
        var _this = this;
        this.serverservice.getLoggedUser()
            .then(function (user) {
            _this.redirectToHome();
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.getLoggedUser();
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'login',
            template: __webpack_require__(526),
            styles: [__webpack_require__(522)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_server_service__["a" /* ServerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_server_service__["a" /* ServerService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/login.component.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (messages, term) {
        if (!term)
            return messages;
        term = term.toLowerCase();
        return messages.filter(function (message) {
            var userName = message.userName.toLowerCase(), messageText = message.messageText.toLowerCase();
            return userName.includes(term) || messageText.includes(term);
        });
    };
    FilterPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'filter'
        }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/filter.pipe.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighlightPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HighlightPipe = (function () {
    function HighlightPipe() {
    }
    HighlightPipe.prototype.transform = function (text, term) {
        if (!term)
            return text;
        return text.replace(term, function (match) { return ("<span class=\"highlight\">" + match + "</span>"); });
    };
    HighlightPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'highlight'
        }), 
        __metadata('design:paramtypes', [])
    ], HighlightPipe);
    return HighlightPipe;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/highlight.pipe.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransformMessage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TransformMessage = (function () {
    function TransformMessage() {
    }
    TransformMessage.prototype.transform = function (text, message) {
        // RegExp: clear hash | hash outside and inside span | hash inside span
        var findHashes = /(#[\wа-я]+)|(#<span(.+)?>[\wа-я]+<\/span>([\wа-я]+)?)|(<span(.+)?#([\wа-я]+)?<\/span>([\wа-я]+)?)/g;
        var hashes = message.hashes;
        if (hashes.length > 0) {
            var index_1 = 0;
            return text.replace(findHashes, function (match) {
                var hash = hashes[index_1];
                index_1++;
                return "<a href=\"" + hash + "\">" + match + "</a>";
            });
        }
        else {
            return text;
        }
    };
    TransformMessage = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'transformMessage'
        }), 
        __metadata('design:paramtypes', [])
    ], TransformMessage);
    return TransformMessage;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/transformMessage.pipe.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_server_service__ = __webpack_require__(130);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupComponent = (function () {
    function SignupComponent(serverservice, router) {
        this.serverservice = serverservice;
        this.router = router;
        this.user = {
            username: '',
            name: '',
            password: ''
        };
    }
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this.serverservice.signup(this.user)
            .then(function (user) {
            console.log(user);
            _this.user.username = '';
            _this.user.name = '';
            _this.user.password = '';
            _this.redirectToHome();
        })
            .catch(function (error) {
            console.log(error);
            _this.signupError = 'Signup error. Please, try use another username.';
        });
    };
    SignupComponent.prototype.redirectToHome = function () {
        this.router.navigate(['/']);
    };
    SignupComponent.prototype.getLoggedUser = function () {
        var _this = this;
        this.serverservice.getLoggedUser()
            .then(function (user) {
            _this.redirectToHome();
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SignupComponent.prototype.ngOnInit = function () {
        this.getLoggedUser();
    };
    SignupComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'signup',
            template: __webpack_require__(527),
            styles: [__webpack_require__(523)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_server_service__["a" /* ServerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_server_service__["a" /* ServerService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], SignupComponent);
    return SignupComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/signup.component.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=D:/work/frontend/projects/learning/levelUp/JS/projects/course-project/course-app/src/environment.js.map

/***/ }),

/***/ 520:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 521:
/***/ (function(module, exports) {

module.exports = ".chat {\n    \n}\n.chat * {\n    box-sizing: inherit;\n}\n.chat__auth {\n\n}\n.chat__auth-list {\n    margin: 0;\n    padding: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    list-style: none;\n}\n.chat__auth-item {\n    margin: 0 0 0 10px;\n}\n.chat__auth-link {\n\n}\n\n.chat__search {\n    position: relative;\n    margin: 0 0 30px;\n}\n.chat__search:after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    right: 10px;\n    width: 12px;\n    height: 100%;\n    background: url(assets/img/icon-search.png) 0 50% no-repeat;\n}\n.chat__search-input {\n    \n}\n.chat__heading {\n\n}\n.chat__user {\n\n}\n.chat__messages {\n\n}\n.chat__messages-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.chat__messages-list-message {\n\n}\n.chat__messages-message {\n    position: relative;\n    margin: 0 0 30px;\n    padding: 20px 20px 20px 90px;\n    border: 1px solid #ddd;\n}\n.chat__messages-message:last-child {\n    margin-bottom: 60px;\n}\n.chat__messages-message-header {\n    margin: 0 0 15px;\n    text-align: right;\n}\n.chat__messages-message-avatar {\n    position: absolute;\n    top: 20px;\n    left: 20px;\n    width: 50px;\n    width: 50px;\n    margin: 0 0 10px;\n}\n.chat__messages-message-avatar img {\n    width: 100%;\n}\n.chat__messages-message-username {\n    float: left;\n    color: #ababab;\n    font-family: \"FuturaNewBook-Reg\", Arial, Helvetica, sans-serif;\n    font-size: 22px;\n}\n.chat__messages-message-desc {\n    margin: 0 0 1em;\n    min-height: 10px;\n    font-size: 23px;\n}\n.chat__messages-message-desc:last-child {\n    margin-bottom: 0;\n}\n.chat__messages-message-pic {\n    overflow: hidden;\n    margin: 1em -20px -20px -90px;\n}\n.chat__messages-message-pic img {\n    display: block;\n    max-width: 100%;\n}\n.chat__messages-message-date {\n    color: #c3b07a;\n    font-family: \"FuturaNewBook-Reg\", Arial, Helvetica, sans-serif;\n    font-size: 11px;\n    letter-spacing: .16em;\n    text-transform: uppercase;\n}\n.chat__form {\n    \n}\n.chat__form-input-textarea {\n\n}\n.chat__form-input-file {\n\n}\n.chat__form button {\n\n}"

/***/ }),

/***/ 522:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 523:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 524:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 525:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"chat\">\n      <nav class=\"chat__auth\">\n          <ul class=\"chat__auth-list\" *ngIf=\"isLogged\">\n            <li class=\"chat__auth-item\">\n              <span (click)=\"logout()\" class=\"chat__auth-link button mod_v1\">Logout</span>\n            </li>\n          </ul>\n          <ul class=\"chat__auth-list\" *ngIf=\"!isLogged\">\n            <li class=\"chat__auth-item\">\n              <a routerLink=\"/signup\" class=\"chat__auth-link button mod_v1\">Signup</a>\n            </li>\n            <li class=\"chat__auth-item\">\n              <a routerLink=\"/login\" class=\"chat__auth-link button mod_v1\">Login</a>\n            </li>\n          </ul>\n      </nav>\n      \n      <h1 class=\"chat__heading\">\n        <span class=\"chat__user\" *ngIf=\"isLogged\">Hi, {{userName}},</span>\n        {{title}}\n      </h1>\n\n      <div class=\"chat__search form\">\n        <input type=\"text\" class=\"chat__search-input form-input-text\" placeholder=\"Search here, if you want...\" [(ngModel)]=\"searchTerm\">\n      </div>\n      \n      <div class=\"chat__messages\">\n          <ul class=\"chat__messages-list\">\n              <li *ngFor=\"let message of messages | filter:searchTerm\" class=\"chat__messages-list-message chat__messages-message\">\n                  <header class=\"chat__messages-message-header\">\n                    <div class=\"chat__messages-message-username\" [innerHTML]=\"message.userName | highlight:searchTerm\"></div>\n                    <small class=\"chat__messages-message-date\">\n                      {{message.date}}\n                    </small>\n                  </header>\n                  \n                  <div class=\"chat__messages-message-avatar\">\n                    <img src=\"{{message.avatarUrl}}\" alt=\"\">\n                  </div>\n                  \n                  <p [innerHTML]=\"message.messageText | highlight:searchTerm | transformMessage:message\" class=\"chat__messages-message-desc\"></p>\n                  <figure *ngIf=\"message.imageUrl\" class=\"chat__messages-message-pic\">\n                    <img src=\"{{message.imageUrl}}\" alt=\"\">\n                  </figure>\n              </li>\n          </ul>\n      </div>\n\n      <form action=\"/\" class=\"chat__form form\" (ngSubmit)=\"addMessage(message.value); upload(); message.value=''; image.value='';\" *ngIf=\"isLogged\">\n          <div class=\"chat__form__fieldset form-fieldset\">\n            <textarea name=\"message\" id=\"message\" cols=\"30\" rows=\"10\" class=\"chat__form-input-textarea form-input-textarea\" #message placeholder=\"Type your message here...\"></textarea>\n          </div>\n          <div class=\"chat__form__fieldset form-fieldset\">\n            <label for=\"username\" class=\"form-signup__label form-label\">Add image:</label>\n            <div class=\"form-fieldset-group mod_flex__justify\">\n              <input name=\"image\" id=\"image\" type=\"file\" class=\"chat__form-input-file form-input-file\" accept=\".png,.jpg,.jpeg,.gif\" (change)=\"fileChangeEvent($event)\" #image>\n              <button class=\"form-button\"><span class=\"button mod_v1\">Send message</span></button>\n            </div>\n          </div>\n      </form>\n  </div>  \n</div>\n"

/***/ }),

/***/ 526:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <h1>\n        Login\n    </h1>\n    <form action=\"/\" class=\"form-login form\" (ngSubmit)=\"login()\">\n        <div class=\"form-login__fieldset form-fieldset\">\n            <label for=\"username\" class=\"form-login__label form-label\">Username:</label>\n            <input type=\"text\" name=\"username\" id=\"username\" #username=\"ngModel\" [(ngModel)]=\"user.username\" required class=\"form-login__input-text form-input-text\">\n            <p [hidden]=\"username.valid || username.pristine\" class=\"form-error\">Username field is invalid</p>\n        </div>\n        <div class=\"form-login__fieldset form-fieldset\">\n            <label for=\"password\" class=\"form-login__label form-label\">Password:</label>\n            <input type=\"password\" name=\"password\" id=\"password\" #password=\"ngModel\" [(ngModel)]=\"user.password\" required class=\"form-login__input-text form-input-text\">\n            <p [hidden]=\"password.valid || password.pristine\" class=\"form-error\">Password field is invalid</p>\n        </div>\n        <button class=\"form-button\"><span class=\"button mod_v1\">Login</span></button>\n        <p [hidden]=\"!loginError\" class=\"form-error\">{{loginError}}</p>\n    </form>   \n</div>"

/***/ }),

/***/ 527:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <h1>\n        Signup\n    </h1>\n    <form action=\"/\" class=\"form-signup form\" (ngSubmit)=\"signup()\">\n        <div class=\"form-signup__fieldset form-fieldset\">\n            <label for=\"username\" class=\"form-signup__label form-label\">Username:</label>\n            <input type=\"text\" name=\"username\" id=\"username\" #username=\"ngModel\" [(ngModel)]=\"user.username\" required class=\"form-signup__input-text form-input-text\">\n            <p [hidden]=\"username.valid || username.pristine\" class=\"form-error\">Username field is invalid</p>\n        </div>\n        <div class=\"form-signup__fieldset form-fieldset\">\n            <label for=\"name\" class=\"form-signup__label form-label\">Name:</label>\n        <input type=\"text\" name=\"name\" id=\"name\" #name=\"ngModel\" [(ngModel)]=\"user.name\" class=\"form-signup__input-text form-input-text\">\n        </div>\n        <div class=\"form-signup__fieldset form-fieldset\">\n            <label for=\"password\" class=\"form-signup__label form-label\">Password:</label>\n            <input type=\"password\" name=\"password\" id=\"password\" #password=\"ngModel\" [(ngModel)]=\"user.password\" required class=\"form-signup__input-text form-input-text\">\n            <p [hidden]=\"password.valid || password.pristine\" class=\"form-error\">Password field is invalid</p>\n        </div>\n        <button class=\"form-button\"><span class=\"button mod_v1\">Signup</span></button>\n        <p [hidden]=\"!signupError\" class=\"form-error\">{{signupError}}</p>\n    </form>    \n</div>"

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(339);


/***/ })

},[552]);
//# sourceMappingURL=main.bundle.map