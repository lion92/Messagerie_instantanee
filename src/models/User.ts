import { IUser } from '../interface/IUser';
export default class User implements IUser{

    private nom: string;
    private prenom: string;
    private email: string;
    private password: string;
    private status: number=0;
    private login: string;
    private username: string = "";
    

    constructor(){
        
    }
}