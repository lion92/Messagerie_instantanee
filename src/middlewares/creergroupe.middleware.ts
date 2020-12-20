import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';
import DateException from '../exception/DateException';
import { verify } from 'jsonwebtoken';
import {Request, Response} from 'express';

const split = (token: string) => { return token.split('Bearer ').join('') }

export const creer= (req: Request, res: Response, next: () => void) => {

    console.log('middleware run');
    
    let data: any = req.body;

    const champsRequire = ['nom_groupe', 'id_administrateur','user_iduser' ]

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

        // if (!DateException.checkDate(data.dateNaiss)) // Check valid syntaxe password
        //     throw new DateException();

        next()

    } catch (err) {
         return res.status(401).json({ error: true, message: err.message }).end();
    }
    
}
