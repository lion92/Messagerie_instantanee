import MySQL from '../db/MySQL';
import { IConversation } from '../interface/IConversation';
export default class Conversation implements IConversation{
    private id_conversation:number|null;
    private user_id_emetteur: number;
    
    private user_id_recepteur: number ;
    
    constructor(id_conversation:number|null,user_emetteur: number, user_recepteur: number){
        this.id_conversation=id_conversation;
        this.user_id_emetteur = user_emetteur;
        this.user_id_recepteur = user_recepteur;
    }
    get attributInsert(): Array < string > {
        return [`id_conversation`,`user_id_emetteur`, `user_id_recepteur`];
    };
    get id_conv() : number {
        return <number> this.id_conversation;
    }
    get _user_id_emetteur(): number {
        return this.user_id_emetteur;
    }
    get _user_id_recepteur(): number {
        return this.user_id_recepteur;
    }

    save(): Promise<number> {
        return new Promise((resolve, reject) => {
            MySQL.insert('conversation', this).then((id: number) => {
                this.id_conversation= id;
                resolve(id);
            })
        })
    }
    static update(update: Object, where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.update('conversation', update, where).then((modifiedRows: number ) => {                    
                    console.log("Update Conversation(s) : "+modifiedRows);
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
            MySQL.delete('conversation', where).then((deletedRows: number ) => {                    
                    console.log("Deleted Conversation(s) : "+deletedRows);
                    resolve(deletedRows);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    static select(where: Object) : Promise<Array<Conversation>>{
        return new Promise((resolve, reject) => {
            MySQL.select('conversation', where).then((arrayUser: Array < Conversation > ) => {
                    let newConversation : Conversation;
                    let data: Array < Conversation > = [];
                    for (const conversation of arrayUser) {
                        if(conversation.id_conversation === undefined ) conversation.id_conversation ;
                        newConversation= new Conversation(conversation.id_conversation, conversation.user_id_emetteur, conversation.user_id_recepteur);
                        data.push(newConversation);
                    }
                    //console.log(data);
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    
}