"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Asset {
    constructor(idAsset, nom_document = '', descriptif = '', url = '') {
        this.nom_document = nom_document;
        this.date_creation = Date().toLocaleString();
        this.descriptif = descriptif;
        this.url = url;
        if (idAsset != null) {
            this.idAsset = idAsset;
        }
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('asset', this).then((id) => {
                this.idAsset = id;
                resolve(id);
            });
        });
    }
    get attribut() {
        return ['nom_document', 'date_creation'];
    }
    get id() {
        return this.idAsset;
    }
}
exports.default = Asset;
