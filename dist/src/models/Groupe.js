"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Groupe {
    constructor(id_groupe, nom, admin, user_iduser) {
        this.id_groupe = id_groupe;
        this.nom_groupe = nom;
        this.id_administrateur = admin;
        this.date_creation = new Date().toISOString().replace('Z', '').replace('T', ' ');
        ;
        this.user_iduser = user_iduser;
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('groupe', this).then((id) => {
                this.id_groupe = id;
                resolve(id);
            });
        });
    }
    get user_id() {
        return this.user_iduser;
    }
    get attributInsert() {
        return [`id_groupe`, `nom_groupe`, `id_administrateur`, `date_creation`, `user_iduser`];
    }
    ;
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('groupe', update, where).then((modifiedRows) => {
                console.log("Update Groupe(s) : " + modifiedRows);
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
            MySQL_1.default.delete('groupe', where).then((deletedRows) => {
                console.log("Deleted Groupe(s) : " + deletedRows);
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
            MySQL_1.default.select('groupe', where).then((arrayUser) => {
                let newGroupe;
                let data = [];
                for (const groupe of arrayUser) {
                    if (groupe.id_groupe === undefined)
                        groupe.id_groupe = null;
                    newGroupe = new Groupe(groupe.id_groupe, groupe.nom_groupe, groupe.id_administrateur, groupe.user_iduser);
                    data.push(newGroupe);
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
exports.default = Groupe;
