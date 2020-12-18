"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateException extends Error {
    constructor() {
        super('Date is not valid');
    }
    static checkDate(date) {
        const reg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
        return (!reg.test(date.toLowerCase().trim()));
        return true;
    }
    static checkDateTime(date) {
        const reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        return (!reg.test(date.toLowerCase().trim()));
        return true;
    }
}
exports.default = DateException;
