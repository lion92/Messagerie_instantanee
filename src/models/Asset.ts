import { IAsset } from '../interface/IAsset';

export default class Asset implements IAsset{

    private idAsset: string | null;
    private nom_document: string;
    private date_creation: Date;
    
    constructor(idAsset: string | null, nom_document: string, date_creation: Date){
        this.idAsset = idAsset;
        this.nom_document = nom_document;
        this.date_creation = date_creation;
    }
    get attributInsert(): Array < string > {
        return [`idGroupe`,`nom_groupe`, `id_administrateur`, `date_creation`];
    };
}