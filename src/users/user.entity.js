"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.logInsert = function () {
        console.log("User ".concat(this.id, " Inserted Successfully."));
    };
    User.prototype.logUpdate = function () {
        console.log('User Inserted Successfully.');
    };
    User.prototype.logDelete = function () {
        console.log('User Inserted Successfully.');
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_transformer_1.Exclude)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "status");
    __decorate([
        (0, typeorm_1.AfterInsert)()
    ], User.prototype, "logInsert");
    __decorate([
        (0, typeorm_1.AfterUpdate)()
    ], User.prototype, "logUpdate");
    __decorate([
        (0, typeorm_1.AfterRemove)()
    ], User.prototype, "logDelete");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;