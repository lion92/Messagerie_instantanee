"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthentificationRoute_1 = require("./src/routes/AuthentificationRoute");
const User_1 = __importDefault(require("./src/models/User"));
const PasswordException_1 = __importDefault(require("./src/exception/PasswordException"));
dotenv_1.config(); //process.env
try {
    //nico---------------------------------------
    const routeRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        const pass = yield PasswordException_1.default.hashPassword('password');
        const user1 = new User_1.default(null, "kohler", "nicolas", "nicolas.krohler@imie-paris.fr", pass, "nkohler", "username");
        yield user1.save().then((id) => {
            User_1.default.select({ id_user: id });
            User_1.default.delete({ id_user: id - 1 }).then(() => {
                User_1.default.update({ nom: 'kohler2', prenom: 'nicolas6' }, { id_user: id });
                User_1.default.selectJoin('user', { id_user: 1 });
            });
        });
        // const clientZoubida = new Client(zoubida, 'totoo@too.to', pass);
        //console.log('My name is:', clientZoubida.constructor.name);
        //await clientZoubida.save();
    });
    //routeRegister()
    //Kriss-----------------------------------------------
    /*
    const asset = new Asset(null, 1, "zzz");
    asset.save().then((id: number) => {
        //const groupe=new Groupe(null,"bonjour",1,1);
        //onst b=groupe.save();
        const image = new Image(id);
        image.save();
        Image.select({ asset_idasset: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
        Image.update({}, { asset_idasset: id });
    })
    const asset1 = new Asset(null, 1, "essai")
    // Asset.delete({ id_asset: 240 })
    asset1.save().then((id: number) => {
        Asset.select({ id_asset: id });
        //Asset.delete({ id_asset: id - 1 }).then(() => {
        Asset.update({ nom_document: 'ggggg', descriptif: 'frrfr', url: 'frfr' }, { id_asset: id });

        //})
    });
    const groupe1 = new Groupe(null, "dzz", 1, 1)
    groupe1.save().then((id: number) => {
        const membre = new Membre(id, groupe1.user_id)
        membre.save().then((id: number) => {
            Groupe.select({ user_iduser: id });
            //Groupe.delete({ id_groupe: 6}).then(() => {
            Groupe.update({}, { user_iduser: id });
            //  })
        });
        Groupe.select({ id_groupe: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
        Groupe.update({ nom_groupe: 'frref', id_dministrateur: 2, user_iduser: 2 }, { id_groupe: id });


        //  })
    });

    const message1 = new Message(null, 1, 1, "deezfefz")
    message1.save().then((id: number) => {
        Message.select({ id_message: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
        Message.update({ contenu_message: 'bonjour1' }, { id_message: id });


        //  })
    });
    const conversation1 = new Conversation(null, 1, 2)
    conversation1.save().then((id: number) => {
        Message.select({ id_conversation: id });
        //Groupe.delete({ id_groupe: 6}).then(() => {
        Message.update({}, { id_message: id });


        //  })
    });


    const message = new Message(null, 1, 1, "dzefzjb");
    const test3 = message.save();
    //asset.save();
*/
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/auth', AuthentificationRoute_1.AuthentificationRoute);
    app.listen(process.env.PORT, () => {
        console.log(`Server run to http://localhost:${process.env.PORT}`);
    });
}
catch (error) {
    console.log(error);
}
