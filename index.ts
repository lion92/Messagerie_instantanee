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

    const user1 = new User(null, "kohler", "nicolas", "nicolas.krohler@imie-paris.fr", "password", "nkohler", "username");
    user1.save().then((id: number) => {
        //User.delete({id_user: id-1});
        User.delete({prenom: 'nicolas', nom: 'kohler'});
        //User.select({ nom: "kohler" });
    });

   
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
