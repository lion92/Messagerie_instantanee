import { config } from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";

import User from './src/models/User';
import MySQL from './src/db/MySQL';
import Asset from "./src/models/Asset";
import Image from "./src/models/Image";
import Groupe from "./src/models/Groupe";
import Message from "./src/models/Message";


config(); //process.env


try {

    //nico---------------------------------------
    const user1 = new User(null, "kohler", "gilles", "nicolas.krohleghr@imie-paris.fr2", "password", "nkhhohrler", "username");
    const test=user1.save();
    //user1.save();
    //User.select({ nom: "kohler" });
    //Kriss-----------------------------------------------
    const asset = new Asset(null, 1, "zzz");
    asset.save().then((id: number) => {
    //const groupe=new Groupe(null,"bonjour",1,1);
    //onst b=groupe.save();
        const video= new Image(id);
        video.save();
    })

    const message=new Message(null, 1,1,"dzefzjb");
    const test3=message.save();
    //asset.save();

} catch (error) {
    console.log(error);
}
