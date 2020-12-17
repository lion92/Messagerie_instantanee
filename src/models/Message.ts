import { IMessage } from '../interface/IMessage';
export default class Message implements IMessage{

    private id_user_emetteur: number;
    private id_user_recepteur: number;
    private contenu_message: string;
    private date_envoi: Date;

    constructor(){
        
    }
}