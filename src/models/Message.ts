import { IMessage } from '../interface/IMessage';
export default class Message implements IMessage{

    private id_user_emetteur: number;
    private id_user_recepteur: number;
    private contenu_message: string;
    private date_envoi: Date;

    constructor(id_emetteur: number, id_recepteur: number, contenu: string, date: Date){
        this.id_user_emetteur = id_emetteur;
        this.id_user_recepteur = id_recepteur;
        this.contenu_message = contenu;
        this.date_envoi = date;
    }
    get attributInsert(): Array < string > {
        return [`id_message`,`conversation_idconversation`, `user_iduser`, `contenu_message`, `date_heure`];
    }
}