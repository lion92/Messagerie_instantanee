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
        primaryKey: `id_user`,
        attribut: [`id_user`, `nom`, `prenom`, `email`, `password`, `status`, `login`, `username`]
    },
    "groupe": {
        primaryKey: `id_groupe`,
        attribut: [`nom_groupe`, `id_administrateur`, `date_creation`, `id_user`]
    },
    "asset": {
        primaryKey: `id_asset`,
        attribut: [`nom_document`, `date_creation`, `descriptif`, `url`, `groupe_idgroupe`]
    },
    "conversation": {
        primaryKey: `id_conversation`,
        attribut: [`user_id_emetteur`, `user_id_recepteur`]
    },
    "membre": {
        primaryKey: `user_iduser`,
        attribut: [`groupe_idgroupe`]
    },
    "message": {
        primaryKey: `id_message`,
        attribut: [`conversation_idconversation`, `user_iduser`, `contenu_message`, `date_heure`]
    },
};
// export default { listAttributSelect, listeTables };
exports.default = listAttributSelect;
