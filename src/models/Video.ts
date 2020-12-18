import Asset from './Asset';
import { IVideo } from '../interface/IVideo';
import MySQL from '../db/MySQL';
export default class Video extends Asset {

    private id_Asset:number;

    constructor(idVideo:number){
        super(idVideo,1);
        this.id_Asset=idVideo;
    }
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert('video', this).then((id: number) => {
                this.idAsset = id;
                resolve(id)
            })
        })
    }
}