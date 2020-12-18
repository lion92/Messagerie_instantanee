"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("./Asset"));
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Video extends Asset_1.default {
    constructor(id_video) {
        super(id_video, 1);
        this.id_Asset = id_video;
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('video', this).then((id) => {
                this.id_asset = id;
                resolve(id);
            });
        });
    }
}
exports.default = Video;
