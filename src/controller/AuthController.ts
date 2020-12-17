import { decode, sign } from 'jsonwebtoken';
import PasswordException from '../exception/PasswordException';
import {Request, Response} from 'express';

export class AuthController {

    static login = async(req: Request, res: Response) => {
        let data: any = req.body;
    }
    static register = async(req: Request, res: Response) => {
        let data: any = req.body;
    }
    refreshToken = async (req: Request, res: Response) => { }
    checkToken = async (req: Request, res: Response) => { }
    logout = async (req: Request, res: Response) => { }

}