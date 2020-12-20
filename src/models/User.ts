import { IUser } from '../interface/IUser';
import MySQL from '../db/MySQL';
import { jointureInterface } from '../db/MySQL';
import { listeTables } from '../utils/listAttributSelect';
import Groupe from './Groupe';
import Conversation from './Conversation';
import Message from './Message';
export default class User implements IUser {

    public id_user?: number | null;
    public nom: string;
    private prenom: string;
    private email: string;
    private password: string;
    private status: number = 4;
    private login: string;
    private username: string;
    protected table: string = 'user';

    constructor(id_user: number | null, nom: string, prenom: string, email: string, password: string, login: string, username: string) {
        if (id_user !== null) this.id_user = id_user;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = 1;
        this.login = login;
        this.username = username;
    }
    get attributInsert(): Array<string> {
        return [`id_user`, `nom`, `prenom`, `email`, `password`, `login`, `username`, `status`];
    }
    save(): Promise<number> {
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
    static select(where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.select('user', where).then((arrayUser: Array<User>) => {
                let newUser: User;
                let data: Array<User> = [];
                for (const user of arrayUser) {
                    if (user.id_user === undefined) user.id_user = null;
                    newUser = new User(user.id_user, user.nom, user.prenom, user.email, user.password, user.login, user.username);
                    data.push(newUser);
                }
                resolve(data);
            }).catch((err) => {
                console.log(err);
                reject(false)
            });


        });
    }
    static selectJoin(tableJoin: listeTables, where: Object) {
        return new Promise((resolve, reject) => {
            const join: Array<jointureInterface> = [{
                type: 'INNER',
                table: 'groupe',
                where: {
                    table: 'groupe',
                    foreignKey: 'user_iduser'
                }
            },
            {
                type: 'INNER',
                table: 'conversation',
                where: {
                    table: 'conversation',
                    foreignKey: 'user_id_emetteur'
                }
            }
            /*,
            {
                type: 'INNER',
                table: 'message',
                where: {
                    table: 'message',
                    foreignKey: 'user_iduser'
                }
            }*/
        ];
            MySQL.selectJoin(tableJoin, join, where).then((arrayUser: Array<any>) => {
                let newUser: User;
                let newGroupe: Groupe;
                let newConversation: Conversation;
                let data: Array<any> = [];
                for (const element of arrayUser) {
                    newUser = new User(element.id_user, element.nom, element.prenom, element.email, element.password, element.login, element.username);
                    data.push(newUser);
                    
                    newGroupe = new Groupe(element.id_groupe,element.nom_groupe,element.id_administrateur,element.user_iduser);
                    data.push(newGroupe);
                    
                    newConversation = new Conversation(element.id_conversation,element.user_id_emetteur,element.user_id_recepteur);
                    data.push(newConversation);
                }
                    
                
                console.log(data);
                resolve(data);
            }).catch((err) => {
                console.log(err);
                reject(false)
            });
        });
    }
    static delete(where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.delete('user', where).then((deletedRows: number) => {
                console.log("Deleted User(s) : " + deletedRows);
                resolve(deletedRows);
            })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    static update(update: Object, where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.update('user', update, where).then((modifiedRows: number) => {
                console.log("Update User(s) : " + modifiedRows);
                resolve(modifiedRows);
            })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

    static isExiste(email: string) {
        return new Promise((resolve, reject) => {
            MySQL.select('user', { email: email }).then((arrayClient: Array < any > ) => {
                    resolve((arrayClient.length > 0))
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

    


}