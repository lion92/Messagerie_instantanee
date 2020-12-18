"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(nom, prenom, email, password, status, login, username) {
        this.nom = "";
        this.prenom = "";
        this.email = "";
        this.password = "";
        this.status = 0;
        this.login = "";
        this.username = "";
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;
        if (username != undefined)
            this.username = username;
    }
}
exports.default = User;
