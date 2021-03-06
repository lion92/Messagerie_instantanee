import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';



import PasswordException from '../exception/PasswordException';
import User from '../models/User';
import Groupe from '../models/Groupe';
import Asset from '../models/Asset';

export class AssetController {

    /**
     *
     *
     * @static
     * @memberof AuthController
     */
    static creer_asset = async(req: Request, res: Response) => {
        let data: any = req.body;

        try {
        
            const asset = new Asset(null, data.groupe_idgroupe, data.nom_document, data.descriptif, data.url)
            asset.save();
            return res.status(201).json("asset creer");

        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    refreshToken = async(req: Request, res: Response) => {}
    checkToken = async(req: Request, res: Response) => {}
    logout = async(req: Request, res: Response) => {}

}