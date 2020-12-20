import { IConversation } from '../interface/IConversation';
export default class Conversation implements IConversation{

    private user_id_emetteur: number ;
    private user_id_recepteur: number ;
    
    constructor(user_emetteur: number, user_recepteur: number){
        this.user_id_emetteur = user_emetteur;
        this.user_id_recepteur = user_recepteur;
    }
    get attributInsert(): Array < string > {
        return [`id_conversation`,`user_id_emetteur`, `user_id_recepteur`];
    };
}