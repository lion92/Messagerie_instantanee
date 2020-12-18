import MySQL from '../db/MySQL';
import { IAsset } from '../interface/IAsset';

export default class Asset implements IAsset {
    public id_asset?: number | null;
    protected nom_document: string;
    protected date_creation: string;
    protected descriptif: string | null;
    protected url: string | null;
    protected groupe_idgroupe: number;

    constructor(id_asset: number | null, groupe_idgroupe: number = 1, nom_document: string = '', descriptif: null | string = '', url: null | string = '') {
        this.nom_document = nom_document;
        this.date_creation = new Date().toISOString().replace('Z', '').replace('T', ' ');
        this.descriptif = descriptif;
        this.url = url;
        this.groupe_idgroupe = groupe_idgroupe;

        if (id_asset != null) this.id_asset = id_asset;

    }

    save(): Promise<number> {
        return new Promise((resolve, reject) => {
            MySQL.insert('asset', this).then((id: number) => {
                this.id_asset = id;
                resolve(id);
            })
        })
    }

    get attributInsert(): Array<string> {
        return ['nom_document', 'date_creation', 'groupe_idgroupe']
    }

    get id(): any {
        return this.id_asset;
    }

    toTimestamp(strDate: string): number {
        var datum = Date.parse(strDate);
        return datum / 1000;

    }
}