import { config } from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";


import User from './src/models/User';
import MySQL from './src/db/MySQL';


config(); //process.env


try {
    const user1 = new User(null, "kohler", "gilles", "nicolas.kohler@imie-paris.fr", "password", "nkohler", "username");

    user1.save();
    
    //User.select(user1);
    User.select({nom: "kohler"});
} catch (error) {
    console.log(error);
}
/*
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth',AuthentificationRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})*/