"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class PasswordException extends Error {
    constructor() {
        super("Password is not valid");
    }
    static isValidPassword(password) {
        return password.length >= this.MIN_PASS_SIZE;
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.hash(password, this.SALT_ROUNDS);
        });
    }
    static comparePassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.compare(password, hash);
        });
    }
}
exports.default = PasswordException;
PasswordException.SALT_ROUNDS = 10;
PasswordException.MIN_PASS_SIZE = 6;
