import Asset from './Asset';
import { IImage } from '../interface/IImage';
import MySQL from '../db/MySQL';

export default class Image extends Asset {
 private asset_idasset:number|null|undefined;
   
 constructor(idImage:number){
        super(idImage);
       this.asset_idasset=this.idAsset;
    }
    get attribut(): Array < string > {
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
}