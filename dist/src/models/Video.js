"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("./Asset"));
class Video extends Asset_1.default {
    constructor(nom, date_creation) {
        super(nom, date_creation);
    }
}
exports.default = Video;
