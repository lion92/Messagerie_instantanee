import User from './User';
import { IGroupe } from '../interface/IGroupe';

export default class Groupe implements IGroupe {

    private nom_groupe: string;
    private administrateur: User;
    private date_creation: Date;

    constructor() {

    }
}