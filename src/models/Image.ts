import Asset from './Asset';
import { IImage } from '../interface/IImage';
import MySQL from '../db/MySQL';

export default class Image extends Asset {
 private asset_idasset:number;
   
 constructor(id_image:number){
        super(id_image);
       this.asset_idasset=id_image;
    }
    get attributInsert(): Array<string> {
        return ['asset_idasset'];
    }
    
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert('image', this).then((id: number) => {
                this.asset_idasset = id;
                resolve(id)
            })
        })
    }

    static update(update: Object, where: Object) {
        return new Promise((resolve, reject) => {
            MySQL.update('image', update, where).then((modifiedRows: number ) => {                    
                    console.log("Update Image(s) : "+modifiedRows);
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
            MySQL.delete('image', where).then((deletedRows: number ) => {                    
                    console.log("Deleted Image(s) : "+deletedRows);
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
            MySQL.select('image', where).then((arrayUser: Array < Image > ) => {
                    let newImage : Image;
                    let data: Array < Image > = [];
                    for (const image of arrayUser) {
                        if(image.asset_idasset === undefined ) image.asset_idasset ;
                        newImage= new Image(image.asset_idasset);
                        data.push(newImage);
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