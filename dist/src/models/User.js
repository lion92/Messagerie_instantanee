"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class User {
    constructor(id_user, nom, prenom, email, password, login, username) {
        this.status = 4;
        this.table = 'user';
        if (id_user !== null)
            this.id_user = id_user;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;
        this.username = username;
    }
    get attributInsert() {
        return [`id_user`, `nom`, `prenom`, `email`, `password`, `login`, `username`, `status`];
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert(this.table, this).then((id) => {
                this.id_user = id;
                console.log(`Save ${this.table}`);
                resolve(id);
            }).catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static select(where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.select('user', where).then((arrayUser) => {
                let newUser;
                let data = [];
                for (const user of arrayUser) {
                    if (user.id_user === undefined)
                        user.id_user = null;
                    newUser = new User(user.id_user, user.nom, user.prenom, user.email, user.password, user.login, user.username);
                    data.push(newUser);
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
exports.default = User;
