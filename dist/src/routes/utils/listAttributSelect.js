"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
const listAttributSelect = {
    "asset": {
        primaryKey: `idasset`,
        attribut: [`nom_document`, `date_creation`, `descriptif`, `url`, `groupe_idgroupe`]
    },
    "video": {
        primaryKey: `asset_idasset`,
        attribut: []
    },
    "image": {
        primaryKey: `asset_idasset`,
        attribut: []
    }
};
// export default { listAttributSelect, listeTables };
exports.default = listAttributSelect;
