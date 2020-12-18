import { IUser } from '../interface/IUser';
export default class User implements IUser{

    private nom: string ="";
    private prenom: string="";
    private email: string="";
    private password: string="";
    private status: number=0;
    private login: string="";
    private username: string="";
    

    constructor(nom: string, prenom: string, email: string, password: string, status: number, login: string,username?: string){
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;

        if(username != undefined) this.username = username;
    }
}