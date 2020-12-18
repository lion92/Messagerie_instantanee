import User from './User';
import { IGroupe } from '../interface/IGroupe';

export default class Groupe implements IGroupe {

    private nom_groupe: string;
    private id_administrateur: number;
    private date_creation: Date;

    constructor(nom: string, admin: number, date: Date) {
        this.nom_groupe = nom;
        this.id_administrateur = admin;
        this.date_creation = date;
    }
}