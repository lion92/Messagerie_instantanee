"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Membre {
    constructor(user_iduser, groupe_idgroupe) {
        this.user_iduser = user_iduser;
        this.groupe_idgroupe = groupe_idgroupe;
    }
    get attributInsert() {
        return ['user_iduser', 'groupe_idgroupe'];
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('membre', this).then((id) => {
                this.user_iduser = this.user_iduser;
                resolve(id);
            });
        });
    }
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('membre', update, where).then((modifiedRows) => {
                console.log("Update Membre(s) : " + modifiedRows);
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
            MySQL_1.default.delete('membre', where).then((deletedRows) => {
                console.log("Deleted Membre(s) : " + deletedRows);
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
            MySQL_1.default.select('membre', where).then((arrayUser) => {
                let newMembre;
                let data = [];
                for (const membre of arrayUser) {
                    if (membre.user_iduser === undefined)
                        membre.user_iduser;
                    newMembre = new Membre(membre.user_iduser, membre.groupe_idgroupe);
                    data.push(newMembre);
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
exports.default = Membre;
