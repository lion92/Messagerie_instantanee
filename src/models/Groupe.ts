import User from './User';
import { IGroupe } from '../interface/IGroupe';

export default class Groupe implements IGroupe {

    private idGroupe: number | null;
    private nom_groupe: string;
    private id_administrateur: number;
    private date_creation: Date;

    constructor(idGroupe: number | null, nom: string, admin: number, date: Date) {
        this.idGroupe = idGroupe;
        this.nom_groupe = nom;
        this.id_administrateur = admin;
        this.date_creation = date;
    }

    get attributInsert(): Array < string > {
        return [`idGroupe`,`nom_groupe`, `id_administrateur`, `date_creation`];
    };
}