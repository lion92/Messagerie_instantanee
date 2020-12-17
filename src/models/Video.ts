import Asset from './Asset';
import { IVideo } from '../interface/IVideo';
export default class Video extends Asset implements IVideo{

    constructor(nom: string, date_creation: Date){
        super(nom,date_creation);
    }
}