"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Asset {
    constructor(id_asset, groupe_idgroupe = 1, nom_document = '', descriptif = '', url = '') {
        this.nom_document = nom_document;
        this.date_creation = new Date().toISOString().replace('Z', '').replace('T', ' ');
        this.descriptif = descriptif;
        this.url = url;
        this.groupe_idgroupe = groupe_idgroupe;
        if (id_asset != null)
            this.id_asset = id_asset;
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('asset', this).then((id) => {
                this.id_asset = id;
                resolve(id);
            });
        });
    }
    get attributInsert() {
        return ['nom_document', 'date_creation', 'groupe_idgroupe'];
    }
    get id() {
        return this.id_asset;
    }
    toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }
}
exports.default = Asset;
