import { decode, sign, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response } from 'express';


import PasswordException from '../exception/PasswordException';
import User from '../models/User';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import Groupe from '../models/Groupe';

const expirationToken = '5m';

export class UserController {

    static envoyer_message = async (req: Request, res: Response) => {

        let data: any = req.body;
        const authHeader = req.headers['authorization'];
        if (authHeader !== undefined) {
            if (authHeader.startsWith("Bearer ")) {
                const tokenAuth = authHeader.substring(7, authHeader.length);
                console.log(tokenAuth);
                const theToken: any = await sign({ id: data.user_id_emetteur }, <string>process.env.JWT_KEY, { expiresIn: expirationToken })
                console.log(theToken);
                if (tokenAuth.toString() == theToken.toString()) console.log('le token est bon');
            }
        }


        try {
            Conversation.select({ user_id_emetteur: data.user_id_emetteur, user_id_recepteur: data.user_id_recepteur }).then(async (dataConv: Array<Conversation>) => {
                if (dataConv.length > 0) {
                    let conversation = <Conversation>dataConv.pop();
                    let message = new Message(null, conversation.id_conv, conversation._user_id_emetteur, data.contenu_message);
                    message.save();

                    const token = {
                        id_conversation: conversation.id_conv,
                        user_id_emetteur: data.user_id_emetteur,
                        user_id_recepteur: data.user_id_recepteur,
                        contenu_message: data.contenu_message
                    }
                    console.log(`user${data.user_id_emetteur} à envoyé [${data.contenu_message}] à user${data.user_id_recepteur}`);
                    console.log();
                    return res.status(201).json(token);
                } else {
                    if (!await User.userExiste(data.user_id_emetteur))
                        return res.status(201).json({ error: `user${data.user_id_emetteur} n'existe pas` });
                    if (!await User.userExiste(data.user_id_recepteur))
                        return res.status(201).json({ error: `user${data.user_id_recepteur} n'existe pas` });

                    const conversation1 = new Conversation(null, data.user_id_emetteur, data.user_id_recepteur)
                    conversation1.save().then((id: number) => {
                        let message = new Message(null, id, conversation1._user_id_emetteur, data.contenu_message);
                        message.save();

                        const token = {
                            id_conversation: id,
                            user_id_emetteur: data.user_id_emetteur,
                            user_id_recepteur: data.user_id_recepteur,
                            contenu_message: data.contenu_message
                        }
                        console.log(`user${data.user_id_emetteur} à envoyé [${data.contenu_message}] à user${data.user_id_recepteur}`);
                        return res.status(201).json(token);
                    });
                }
            });
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
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