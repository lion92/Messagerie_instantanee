export type listeTables = "user" | "groupe" | "asset" | "conversation" | "membre" | "message";

interface attributSelectInterface {
    primaryKey: string;
    attribut: Array < string > ;
}

/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
const listAttributSelect: Record < listeTables, attributSelectInterface > = { //Constructs a type with a set of properties Keys of type Type. This utility can be used to map the properties of a type to another type.
    "user": {
        primaryKey: `idUser`,
        attribut: [`idUser`,`nom`, `prenom`, `email`, `password`, `status`, `login`, `username`]
        //attribut: [`nom`,`prenom`]
    },
    "groupe": {
        primaryKey: `idgroupe`,
        attribut: [`nomdugroupe`, `administrateur`, `date_creation`, `user_iduser`]
    },
    "asset": {
        primaryKey: `idasset`,
        attribut: [`nom_document`, `date_creation`, `descriptif`, `url`, `groupe_idgroupe`]
    },
    "conversation": {
        primaryKey: `idconversation`,
        attribut: [`user_id_emetteur`, `user_id_recepteur`]
    },
    "membre": {
        primaryKey: `user_iduser`,
        attribut: [`groupe_idgroupe`]
    },
    "message": {
        primaryKey: `idmessage`,
        attribut: [`conversation_idconversation`, `user_iduser`, `contenu_message`, `date_heure`]
    },
};

// export default { listAttributSelect, listeTables };
export default listAttributSelect;