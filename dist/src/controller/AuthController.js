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
exports.AuthController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const PasswordException_1 = __importDefault(require("../exception/PasswordException"));
const User_1 = __importDefault(require("../models/User"));
class AuthController {
    constructor() {
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this.checkToken = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthController = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        let client = yield User_1.default.select({ email: data.email });
        if (client.length < 0)
            throw new Error(`Email don't exist!`);
        client = client[0];
        const isOk = yield PasswordException_1.default.comparePassword(data.password, client.password);
        if (!isOk)
            throw new Error(`User is undefined!`);
        const theToken = yield jsonwebtoken_1.sign({ id: client.id_user, name: client.username }, process.env.JWT_KEY, { expiresIn: '1m' });
        const token = {
            token: theToken,
            expired: yield jsonwebtoken_1.decode(theToken).exp,
            connected: '<h1>You are logged</h1>'
        };
        return res.status(201).json(token);
    }
    catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
});
/**
 *
 *
 * @static
 * @memberof AuthController
 */
AuthController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        if (yield User_1.default.isExiste(data.email))
            throw new Error(`Email exist!`);
        const pass = yield PasswordException_1.default.hashPassword(data.password);
        const client = new User_1.default(null, data.nom, data.prenom, data.email, pass, data.login, data.username);
        yield client.save();
        const theToken = yield jsonwebtoken_1.sign({ id: client.id_user, name: client.nom }, process.env.JWT_KEY, { expiresIn: '5m' });
        const token = {
            token: theToken,
            expired: yield jsonwebtoken_1.decode(theToken).exp
        };
        return res.status(201).json(token);
    }
    catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
});
