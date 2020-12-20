import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';



import PasswordException from '../exception/PasswordException';
import User from '../models/User';
import Groupe from '../models/Groupe';

export class GroupeController {

    /**
     *
     *
     * @static
     * @memberof AuthController
     */
    static creer_groupe = async(req: Request, res: Response) => {
        let data: any = req.body;

        try {
        
            const groupe1 = new Groupe(null,data.nom, data.admin, data.user_iduser)
            return res.status(201).json("groupe creer");

        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    refreshToken = async(req: Request, res: Response) => {}
    checkToken = async(req: Request, res: Response) => {}
    logout = async(req: Request, res: Response) => {}

}