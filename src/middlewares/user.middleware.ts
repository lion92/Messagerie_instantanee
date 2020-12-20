import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';
import DateException from '../exception/DateException';
import { verify } from 'jsonwebtoken';
import {Request, Response} from 'express';

const split = (token: string) => { return token.split('Bearer ').join('') }

export const messageMidd = (req: Request, res: Response, next: () => void) => {

    let data: any = req.body;
    const champsRequire = [`user_id_emetteur`, `user_id_recepteur`, `contenu_message`];

    try {

        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire) {
            error = true;
            for (const champs in data) {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }
        if (textError.length > 0) {
            textError = textError.slice(0, -2); // Delete ', '
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        next();

    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}
