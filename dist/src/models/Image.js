"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("./Asset"));
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Image extends Asset_1.default {
    constructor(id_image) {
        super(id_image);
        this.asset_idasset = this.id_asset;
    }
    get attribut() {
        return ['asset_idasset'];
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('image', this).then((id) => {
                this.asset_idasset = id;
                resolve(id);
            });
        });
    }
}
exports.default = Image;
