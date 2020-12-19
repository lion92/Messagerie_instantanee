import User from './User';
import { IGroupe } from '../interface/IGroupe';
import MySQL from '../db/MySQL';

export default class Groupe implements IGroupe {

    private id_groupe: number | null;
    private nom_groupe: string;
    private id_administrateur: number;
    private date_creation: string;
    private user_iduser:number;

    constructor(id_groupe: number | null, nom: string, admin: number,user_iduser:number) {
        this.id_groupe = id_groupe;
        this.nom_groupe = nom;
        this.id_administrateur = admin;
        this.date_creation = new Date().toISOString().replace('Z', '').replace('T', ' ');;
        this.user_iduser=user_iduser;
    }
    save(): Promise<number> {
        return new Promise((resolve, reject) => {
            MySQL.insert('groupe', this).then((id: number) => {
                this.id_groupe = id;
                resolve(id);
            })
        })
    }
    get attributInsert(): Array < string > {
        return [`id_groupe`,`nom_groupe`, `id_dministrateur`, `date_creation`,`user_iduser`];
    };
}