import { IConversation } from '../interface/IConversation';
export default class Conversation implements IConversation{

    private utilisateur1: string ;
    private utilisateur2: string ;
    
    constructor(utilisateur1: string, utilisateur2: string){
        this.utilisateur1 = utilisateur1;
        this.utilisateur2 = utilisateur2;
    }
    get attributInsert(): Array < string > {
        return [`idconversation`,`user_id_emetteur`, `user_id_recepteur`];
    };
}