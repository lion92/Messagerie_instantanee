import MySQL from "../db/MySQL";

export default class Membre {

    private  user_iduser:number;
    private groupe_idgroupe:number;

     constructor(user_iduser:number, groupe_idgroupe:number){
        this.user_iduser=user_iduser;
        this.groupe_idgroupe=groupe_idgroupe;

     }
     get attributInsert(): Array<string> {
        return ['user_iduser', 'groupe_idgroupe']
    }
     save(): Promise<number> {
        return new Promise((resolve, reject) => {
            MySQL.insert('membre', this).then((id: number) => {
                this.user_iduser= this.user_iduser;
                resolve(id);
            })
        })
    }
    static update(update: Object, where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.update('membre', update, where).then((modifiedRows: number ) => {                    
                    console.log("Update Membre(s) : "+modifiedRows);
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
            MySQL.delete('membre', where).then((deletedRows: number ) => {                    
                    console.log("Deleted Membre(s) : "+deletedRows);
                    resolve(deletedRows);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
    }
    static select(where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.select('membre', where).then((arrayUser: Array < Membre > ) => {
                    let newMembre : Membre;
                    let data: Array < Membre > = [];
                    for (const membre of arrayUser) {
                        if(membre.user_iduser === undefined ) membre.user_iduser;
                        newMembre= new Membre(membre.user_iduser, membre.groupe_idgroupe);
                        data.push(newMembre);
                    }
                    console.log(data);
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(false)
                });
        })
        
    }

}