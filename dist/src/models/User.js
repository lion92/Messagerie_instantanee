"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
const Groupe_1 = __importDefault(require("./Groupe"));
const Conversation_1 = __importDefault(require("./Conversation"));
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
    get id() {
        return this.id_user;
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
                resolve(data);
            }).catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static selectJoin(tableJoin, where) {
        return new Promise((resolve, reject) => {
            const join = [{
                    type: 'INNER',
                    table: 'groupe',
                    where: {
                        table: 'groupe',
                        foreignKey: 'user_iduser'
                    }
                },
                {
                    type: 'INNER',
                    table: 'conversation',
                    where: {
                        table: 'conversation',
                        foreignKey: 'user_id_emetteur'
                    }
                }
                /*,
                {
                    type: 'INNER',
                    table: 'message',
                    where: {
                        table: 'message',
                        foreignKey: 'user_iduser'
                    }
                }*/
            ];
            MySQL_1.default.selectJoin(tableJoin, join, where).then((arrayUser) => {
                let newUser;
                let newGroupe;
                let newConversation;
                let data = [];
                for (const element of arrayUser) {
                    newUser = new User(element.id_user, element.nom, element.prenom, element.email, element.password, element.login, element.username);
                    data.push(newUser);
                    newGroupe = new Groupe_1.default(element.id_groupe, element.nom_groupe, element.id_administrateur, element.user_iduser);
                    data.push(newGroupe);
                    newConversation = new Conversation_1.default(element.id_conversation, element.user_id_emetteur, element.user_id_recepteur);
                    data.push(newConversation);
                }
                console.log(data);
                resolve(data);
            }).catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static delete(where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.delete('user', where).then((deletedRows) => {
                console.log("Deleted User(s) : " + deletedRows);
                resolve(deletedRows);
            })
                .catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('user', update, where).then((modifiedRows) => {
                console.log("Update User(s) : " + modifiedRows);
                resolve(modifiedRows);
            })
                .catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
    static isExiste(email) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.select('user', { email: email }).then((arrayClient) => {
                resolve((arrayClient.length > 0));
            })
                .catch((err) => {
                console.log(err);
                reject(false);
            });
        });
    }
}
exports.default = User;
