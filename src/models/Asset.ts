import { IAsset } from '../interface/IAsset';

export default class Asset implements IAsset{

    private nom_document: string;
    private date_creation: Date;
    
    constructor(nom_document: string, date_creation: Date){
        this.nom_document = nom_document;
        this.date_creation = date_creation;
    }
}