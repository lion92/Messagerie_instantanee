import Asset from './Asset';
import { IImage } from '../interface/IImage';
import MySQL from '../db/MySQL';

export default class Image extends Asset {
 private asset_idasset:number|null|undefined;
   
 constructor(id_image:number){
        super(id_image);
       this.asset_idasset=this.id_asset;
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
}