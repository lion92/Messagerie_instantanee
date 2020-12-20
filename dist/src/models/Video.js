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
    get attributInsert() {
        return ['asset_idasset'];
    }
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('video', update, where).then((modifiedRows) => {
                console.log("Update Video(s) : " + modifiedRows);
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
            MySQL_1.default.delete('video', where).then((deletedRows) => {
                console.log("Deleted video(s) : " + deletedRows);
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
                let newVideo;
                let data = [];
                for (const video of arrayUser) {
                    if (video.id_Asset === undefined)
                        video.id_Asset;
                    newVideo = new Video(video.id_Asset);
                    data.push(newVideo);
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
exports.default = Video;
