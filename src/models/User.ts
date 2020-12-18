import { IUser } from '../interface/IUser';
import MySQL from '../db/MySQL';
export default class User implements IUser{

    private idUser?: number | null;
    private nom: string;
    private prenom: string;
    private email: string;
    private password: string;
    private status: number = 4;
    private login: string;
    private username?: string | null;
    protected table: string = 'user';

    constructor(idUser:number | null, nom: string, prenom: string, email: string, password: string, login: string,username?: string){
        if(idUser !== null) this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;
        if(username !== undefined) this.username = username;
        else this.username = null;
    }
    get attributInsert(): Array < string > {
        return [`idUser`,`nom`, `prenom`, `email`, `password`, `login`, `username`,`status`];
    }
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert(this.table, this).then((id: number) => {
                this.idUser = id;
                console.log(`Save ${this.table}`);
                resolve(id);
            }).catch((err) => {
                console.log(err);
                reject(false);
            })
        })
    }
    static select(where: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('user', where).then((arrayUser: Array < User > ) => {
                    let newUser : User;
                    let data: Array < User > = [];
                    for (const user of arrayUser) {
                        console.log(user.idUser);
                        if(user.idUser === undefined ) user.idUser = null;
                        newUser = new User(user.idUser, user.nom, user.prenom, user.email, user.password, user.login);
                        
                        data.push(newUser);
                    }
                    console.log(arrayUser);
                    resolve(data);
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
}