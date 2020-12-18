"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const User_1 = __importDefault(require("./src/models/User"));
const Asset_1 = __importDefault(require("./src/models/Asset"));
dotenv_1.config(); //process.env
try {
    //nico---------------------------------------
    const user1 = new User_1.default(null, "kohler", "gilles", "nicolas.krohleghr@imie-paris.fr", "password", "nkhhohrler", "username");
    //user1.save();
    //User.select({ nom: "kohler" });
    //Kriss-----------------------------------------------
    const asset = new Asset_1.default(null, 1, "zzz");
    asset.save().then((id) => {
        //const image = new Image(id);
        //image.save();
    });
    //asset.save();
}
catch (error) {
    console.log(error);
}
