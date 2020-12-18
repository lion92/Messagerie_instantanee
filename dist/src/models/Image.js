"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("./Asset"));
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Image extends Asset_1.default {
    constructor(idImage) {
        super(idImage);
        this.id_Asset = idImage;
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('image', this).then((id) => {
                this.idAsset = id;
                resolve(id);
            });
        });
    }
}
exports.default = Image;
