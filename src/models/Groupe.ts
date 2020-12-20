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

    static update(update: Object, where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.update('groupe', update, where).then((modifiedRows: number ) => {                    
                    console.log("Update Groupe(s) : "+modifiedRows);
                    resolve(modifiedRows);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    static delete(where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.delete('groupe', where).then((deletedRows: number ) => {                    
                    console.log("Deleted Groupe(s) : "+deletedRows);
                    resolve(deletedRows);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    static select(where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.select('groupe', where).then((arrayUser: Array < Groupe > ) => {
                    let newGroupe : Groupe;
                    let data: Array < Groupe > = [];
                    for (const groupe of arrayUser) {
                        if(groupe.id_groupe === undefined ) groupe.id_groupe = null;
                        newGroupe= new Groupe(groupe.id_groupe, groupe.nom_groupe, groupe.id_administrateur, groupe.user_iduser);
                        data.push(newGroupe);
                    }
                    console.log(data);
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }




}