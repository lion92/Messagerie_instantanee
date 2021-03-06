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
        this.asset_idasset = id_image;
    }
    get attributInsert() {
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
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('image', update, where).then((modifiedRows) => {
                console.log("Update Image(s) : " + modifiedRows);
                resolve(modifiedRows);
            })
                .catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static delete(where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.delete('image', where).then((deletedRows) => {
                console.log("Deleted Image(s) : " + deletedRows);
                resolve(deletedRows);
            })
                .catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static select(where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.select('image', where).then((arrayUser) => {
                let newImage;
                let data = [];
                for (const image of arrayUser) {
                    if (image.asset_idasset === undefined)
                        image.asset_idasset;
                    newImage = new Image(image.asset_idasset);
                    data.push(newImage);
                }
                console.log(data);
                resolve(data);
            })
                .catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
}
exports.default = Image;
