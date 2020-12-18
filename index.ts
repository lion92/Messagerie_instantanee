import { config } from "dotenv";
import express from "express";
import Asset from "./src/models/Asset";
import Image from "./src/models/Image";

config(); //process.env
const app = express();

const asset=new Asset(null,1,"ddd")
asset.save().then((id: number) => {
    
const image=new Image(id);
image.save();
})
//asset.save();
