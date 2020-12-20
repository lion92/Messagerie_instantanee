import { Request, Response } from 'express';
import Asset from '../models/Asset';
import Video from '../models/Video';

export class VideoController {

    static creer_video = async(req: Request, res: Response) => {
        let data: any = req.body;

        try {
            const asset = new Asset(null, data.groupe_idgroupe, data.nom_document, data.descriptif, data.url)
            
            asset.save().then ((id: number) => {
                let video = new Video(id);
                video.save();
            
            return res.status(201).json("video creer");
        })
        
    }catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
}