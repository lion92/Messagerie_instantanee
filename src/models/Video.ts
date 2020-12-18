import Asset from './Asset';
import { IVideo } from '../interface/IVideo';
import MySQL from '../db/MySQL';
export default class Video extends Asset {

    private id_Asset:number;

    constructor(id_video:number){
        super(id_video,1);
        this.id_Asset=id_video;
    }
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert('video', this).then((id: number) => {
                this.id_asset = id;
                resolve(id)
            })
        })
    }
}