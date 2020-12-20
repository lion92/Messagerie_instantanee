import { decode, sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';


import PasswordException from '../exception/PasswordException';
import User from '../models/User';
import Conversation from '../models/Conversation';
import Message from '../models/Message';

const split = (token: string) => { return token.split('Bearer ').join('') }
const expirationToken = '5m';

export class AuthController {

    static register = async (req: Request, res: Response) => {
        let data: any = req.body;

        try {
            if (await User.isExiste(data.email))
                throw new Error(`Email exist!`)

            const pass = await PasswordException.hashPassword(data.password);
            const user = new User(null, data.nom, data.prenom, data.email, pass, data.login, data.username);
            await user.save();

            const theToken: any = await sign({ id: user.id_user }, <string>process.env.JWT_KEY, { expiresIn: expirationToken })

            const token = {
                token: theToken,
                expired: await (<any>decode(theToken)).exp
            }
            return res.status(201).json(token);

        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
    static login = async (req: Request, res: Response) => {

        let data: any = req.body;

        try {
            let arrayUser: Array<User> = await User.select({ email: data.email });

            if (arrayUser.length === 0)
                throw new Error(`Email don't exist!`)
            let user: User = <User>arrayUser.pop();
            const passwordIsOk = await PasswordException.comparePassword(data.password, user._password);

            if (!passwordIsOk)
                throw new Error(`Wrong password`)

            const theToken: any = await sign({ id: user.id_user }, <string>process.env.JWT_KEY, { expiresIn: expirationToken })

            const token = {
                token: theToken,
                expired: await (<any>decode(theToken)).exp,
                connected: '<h1>You are logged</h1>'
            }
            return res.status(201).json(token);
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    refreshToken = async (req: Request, res: Response) => { }

    static checkToken = async (req: Request, res: Response) => {
        
        try {
            let tokenAuth = "" ;
            if (req.headers.authorization) tokenAuth = split(req.headers.authorization);

            verify(tokenAuth, <string>process.env.JWT_KEY);
            return { tokenExpired: false };
        } catch (err) {
            return { tokenExpired: true, error: err };
        }
    }
    logout = async (req: Request, res: Response) => { }

}