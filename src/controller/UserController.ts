import { decode, sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';


import PasswordException from '../exception/PasswordException';
import User from '../models/User';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import Groupe from '../models/Groupe';
import { AuthController } from './AuthController';

const expirationToken = '5m';

export class UserController {

    static envoyer_message = async (req: Request, res: Response) => {

        let checkToken = await AuthController.checkToken(req,res);
        if (checkToken?.tokenExpired === true) return res.status(401).json({ error: true, message: checkToken.error }).end();
        
        let data: any = req.body;

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
    
}