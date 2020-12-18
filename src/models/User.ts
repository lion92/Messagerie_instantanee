import { IUser } from '../interface/IUser';
import MySQL from '../db/MySQL';
export default class User implements IUser{

    private id_user?: number | null;
    private nom: string;
    private prenom: string;
    private email: string;
    private password: string;
    private status: number = 4;
    private login: string;
    private username: string;
    protected table: string = 'user';

    constructor(id_user:number | null, nom: string, prenom: string, email: string, password: string, login: string,username: string){
        if(id_user !== null) this.id_user = id_user;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;
        this.username = username;
    }
    get attributInsert(): Array < string > {
        return [`id_user`,`nom`, `prenom`, `email`, `password`, `login`, `username`,`status`];
    }
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert(this.table, this).then((id: number) => {
                this.id_user = id;
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
                        if(user.id_user === undefined ) user.id_user = null;
                        newUser = new User(user.id_user, user.nom, user.prenom, user.email, user.password, user.login, user.username);
                        
                        data.push(newUser);
                    }
                    console.log(data);
                    resolve(data);
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
}