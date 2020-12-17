import Asset from './Asset';
import { IImage } from '../interface/IImage';

export default class Image extends Asset implements IImage{

    constructor(nom: string, date_creation: Date){
        super(nom,date_creation);
    }
}