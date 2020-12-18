"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
const listAttributSelect = {
    "user": {
        primaryKey: `idUser`,
        attribut: [`idUser`, `nom`, `prenom`, `email`, `password`, `status`, `login`, `username`]
    },
    "groupe": {
        primaryKey: `personne_idpersonne`,
        attribut: [`email`, `password`, `personne_idpersonne`]
    },
    "asset": {
        primaryKey: `idpersonne`,
        attribut: [`idpersonne`, `nom`, `prenom`, `dateNaiss`, `adresse`, `ville`, `zipcode`, `pays_idPays`]
    },
};
// export default { listAttributSelect, listeTables };
exports.default = listAttributSelect;
