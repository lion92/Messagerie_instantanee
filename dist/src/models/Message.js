"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Message {
    constructor(id_message, conversation_idconversation, user_iduser, contenu, date_heure) {
        this.id_message = id_message;
        this.conversation_idconversation = conversation_idconversation;
        this.user_iduser = user_iduser;
        this.contenu_message = contenu;
        if (date_heure === undefined)
            this.date_heure = new Date().toISOString().replace('Z', '').replace('T', ' ');
        else
            this.date_heure = date_heure.toISOString().replace('Z', '').replace('T', ' ');
    }
    get attributInsert() {
        return [`id_message`, `conversation_idconversation`, `user_iduser`, `contenu_message`, `date_heure`];
    }
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('message', this).then((id) => {
                this.id_message = id;
                resolve(id);
            });
        });
    }
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('message', update, where).then((modifiedRows) => {
                console.log("Update Message(s) : " + modifiedRows);
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
            MySQL_1.default.delete('message', where).then((deletedRows) => {
                console.log("Deleted Message(s) : " + deletedRows);
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
            MySQL_1.default.select('message', where).then((arrayUser) => {
                let newGroupe;
                let data = [];
                for (const message of arrayUser) {
                    if (message.id_message === undefined)
                        message.id_message = null;
                    newGroupe = new Message(message.id_message, message.conversation_idconversation, message.user_iduser, message.contenu_message);
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
exports.default = Message;
