import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';



import PasswordException from '../exception/PasswordException';
import User from '../models/User';
import Groupe from '../models/Groupe';

export class GroupeController {

    static login = async(req: Request, res: Response) => {

        let data: any = req.body;

        try {
            let client: any = await User.select({ email: data.email });
            if (client.length < 0)
                throw new Error(`Email don't exist!`)
            client = client[0];

            const isOk = await PasswordException.comparePassword(data.password, client.password);

            if (!isOk)
                throw new Error(`User is undefined!`)

            const theToken: any = await sign({ id: client.id_user, name: client.username }, < string > process.env.JWT_KEY, { expiresIn: '1m' })

            const token = {
                token: theToken,
                expired: await ( < any > decode(theToken)).exp
            }
            return res.status(201).json(token);
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

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