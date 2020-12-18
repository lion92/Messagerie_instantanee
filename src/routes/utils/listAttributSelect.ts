export type listeTables =  "asset" | "video"|"image";

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
  
    "asset": {
        primaryKey: `idasset`,
        attribut: [`nom_document`, `date_creation`, `descriptif`, `url`, `groupe_idgroupe`]
    },
    "video": {
        primaryKey: `asset_idasset`,
        attribut: [`asset_idasset`]
    },
    "image": {
        primaryKey: `asset_idasset`,
        attribut: [`asset_idasset`]
    }
};

// export default { listAttributSelect, listeTables };
export default listAttributSelect;