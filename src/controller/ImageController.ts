import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import Asset from '../models/Asset';
import Image from '../models/Image';

export class ImageController {

    static creer_image = async(req: Request, res: Response) => {
        let data: any = req.body;

        try {
            const asset = new Asset(null, data.groupe_idgroupe, data.nom_document, data.descriptif, data.url)
            
            asset.save().then ((id: number) => {
                let image = new Image(id);
                image.save();
            
            return res.status(201).json("image creer");
        })
        
    }catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
}