import { config } from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";
import { MessageRoute } from "./src/routes/MessageRoute";
import { GroupeRoute } from "./src/routes/GroupeRoute";
import { AssetRoute } from "./src/routes/AssetRoute";

config(); //process.env

try {

    const app = express();

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/auth', AuthentificationRoute);
    app.use('/message', MessageRoute);
    app.use('/groupe', GroupeRoute);
    app.use('/asset', AssetRoute);

    app.listen(process.env.PORT, () => {
        console.log(`Server run to http://localhost:${process.env.PORT}`);
    })

} catch (error) {
    console.log(error);
}
