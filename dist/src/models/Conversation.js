"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conversation {
    constructor(utilisateur1, utilisateur2) {
        this.utilisateur1 = utilisateur1;
        this.utilisateur2 = utilisateur2;
    }
    get attributInsert() {
        return [`id_conversation`, `user_id_emetteur`, `user_id_recepteur`];
    }
    ;
}
exports.default = Conversation;
