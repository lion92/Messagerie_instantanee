import User from './User';
import { IGroupe } from '../interface/IGroupe';

export default class Groupe implements IGroupe {

    private id_groupe: number | null;
    private nom_groupe: string;
    private id_administrateur: number;
    private date_creation: Date;

    constructor(id_groupe: number | null, nom: string, admin: number, date: Date) {
        this.id_groupe = id_groupe;
        this.nom_groupe = nom;
        this.id_administrateur = admin;
        this.date_creation = date;
    }

    get attributInsert(): Array < string > {
        return [`id_groupe`,`nom_groupe`, `id_administrateur`, `date_creation`];
    };
}