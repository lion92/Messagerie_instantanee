"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Groupe {
    constructor(id_groupe, nom, admin, date) {
        this.id_groupe = id_groupe;
        this.nom_groupe = nom;
        this.id_dministrateur = admin;
        this.date_creation = date;
    }
    get attributInsert() {
        return [`id_groupe`, `nom_groupe`, `id_administrateur`, `date_creation`];
    }
    ;
}
exports.default = Groupe;
