import MySQL from '../db/MySQL';
import { IMessage } from '../interface/IMessage';
export default class Message implements IMessage{
    private id_message:number|null;
    private conversation_idconversation: number;
    private user_iduser: number;
    private contenu_message: string;
    private date_heure: string;

    constructor(id_message:number|null,conversation_idconversation: number, user_iduser: number, contenu: string, date_heure?: Date){
        this.id_message=id_message;
        this.conversation_idconversation = conversation_idconversation;
        this.user_iduser = user_iduser;
        this.contenu_message = contenu;
        if(date_heure === undefined) this.date_heure =new Date().toISOString().replace('Z', '').replace('T', ' ');
        else this.date_heure = date_heure.toISOString().replace('Z', '').replace('T', ' ');
    }
    
    get attributInsert(): Array < string > {
        return [`id_message`,`conversation_idconversation`, `user_iduser`, `contenu_message`, `date_heure`];
    }
    save(): Promise<number> {
        return new Promise((resolve, reject) => {
            MySQL.insert('message', this).then((id: number) => {
                this.id_message = id;
                resolve(id);
            })
        })
}
}