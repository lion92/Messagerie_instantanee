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
import Conversation from "./src/models/Conversation";


config(); //process.env


try {

    //nico---------------------------------------

    const user1 = new User(null, "kohler", "nicolas", "nicolas.krohler@imie-paris.fr", "password", "nkohler", "username");
    user1.save().then((id: number) => {
        User.select({ id_user: id });
        User.delete({ id_user: id - 1 }).then(() => {
            User.update({ nom: 'kohler2', prenom: 'nicolas6' }, { id_user: id });
            User.selectJoin('user',{id_user: 1});

        })
    });



    //Kriss-----------------------------------------------
    const asset = new Asset(null, 1, "zzz");
    asset.save().then((id: number) => {
        //const groupe=new Groupe(null,"bonjour",1,1);
        //onst b=groupe.save();
        const image = new Image(id);
        image.save();
        Image.select({asset_idasset: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
           Image.update({ }, { asset_idasset: id });
    })
    const asset1 = new Asset(null, 1,"essai")
   // Asset.delete({ id_asset: 240 })
    asset1.save().then((id: number) => {
        Asset.select({id_asset: id });
        //Asset.delete({ id_asset: id - 1 }).then(() => {
           Asset.update({nom_document:'ggggg', descriptif:'frrfr',url:'frfr'}, { id_asset: id });
           
        //})
    });
    const groupe1= new Groupe(null,"dzz",1,1)
    groupe1.save().then((id: number) => {
        Groupe.select({id_groupe: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
           Groupe.update({nom_groupe:'frref', id_dministrateur:2,user_iduser:2 }, { id_groupe: id });
           

      //  })
    });
    const message1= new Message(null,1,1,"deezfefz")
    message1.save().then((id: number) => {
        Message.select({id_message: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
           Message.update({contenu_message:'bonjour1' }, { id_message: id });
           

      //  })
    });
    const conversation1= new Conversation(null,1,2)
    conversation1.save().then((id: number) => {
        Message.select({id_conversation: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
           Message.update({ }, { id_message: id });
           

      //  })
    });
    

    const message = new Message(null, 1, 1, "dzefzjb");
    const test3 = message.save();
    //asset.save();

} catch (error) {
    console.log(error);
}
