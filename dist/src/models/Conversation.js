"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("../db/MySQL"));
class Conversation {
    constructor(id_conversation, user_emetteur, user_recepteur) {
        this.id_conversation = id_conversation;
        this.user_id_emetteur = user_emetteur;
        this.user_id_recepteur = user_recepteur;
    }
    get attributInsert() {
        return [`id_conversation`, `user_id_emetteur`, `user_id_recepteur`];
    }
    ;
    save() {
        return new Promise((resolve, reject) => {
            MySQL_1.default.insert('conversation', this).then((id) => {
                this.id_conversation = id;
                resolve(id);
            });
        });
    }
    static update(update, where) {
        return new Promise((resolve, reject) => {
            MySQL_1.default.update('conversation', update, where).then((modifiedRows) => {
                console.log("Update Conversation(s) : " + modifiedRows);
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
            MySQL_1.default.delete('conversation', where).then((deletedRows) => {
                console.log("Deleted Conversation(s) : " + deletedRows);
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
            MySQL_1.default.select('conversation', where).then((arrayUser) => {
                let newConversation;
                let data = [];
                for (const conversation of arrayUser) {
                    if (conversation.id_conversation === undefined)
                        conversation.id_conversation;
                    newConversation = new Conversation(conversation.id_conversation, conversation.user_id_emetteur, conversation.user_id_recepteur);
                    data.push(newConversation);
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
exports.default = Conversation;
