import { config } from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";

import User from './src/models/User';
import MySQL from './src/db/MySQL';
import Asset from "./src/models/Asset";
import Image from "./src/models/Image";


config(); //process.env


try {

    //nico---------------------------------------
    const user1 = new User(null, "kohler", "gilles", "nicolas.kohler@imie-paris.fr", "password", "nkohler", "username");
    user1.save();
    //User.select(user1);
    User.select({ nom: "kohler" });
    //Kriss-----------------------------------------------
    const asset = new Asset(null, 1, "ddd")
    asset.save().then((id: number) => {

        const image = new Image(id);
        image.save();
    })
    //asset.save();

} catch (error) {
    console.log(error);
}
