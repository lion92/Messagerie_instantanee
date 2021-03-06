"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailException extends Error {
    constructor() {
        super("Email is not valid");
    }
    static checkEmail(email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (!reg.test(email.toLocaleLowerCase().trim()));
    }
}
exports.default = EmailException;
