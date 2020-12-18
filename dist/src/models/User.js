"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class User {
    constructor(idUser, nom, prenom, email, password, login, username) {
        this.status = 4;
        this.table = 'user';
        if (idUser !== (null && undefined))
            this.idUser = idUser;
        else
            this.idUser = null;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;
        if (username !== null || undefined)
            this.username = username;
        else
            this.username = null;
    }
    get attributInsert() {
        return [`idUser`, `nom`, `prenom`, `email`, `password`, `status`, `login`, `username`];
    }
    ;
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert(this.table, this).then((id) => {
                this.idUser = id;
                console.log(`Save ${this.table}`);
                resolve(id);
            }).catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    ;
}
exports.default = User;
