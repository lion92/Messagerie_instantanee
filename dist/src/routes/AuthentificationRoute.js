"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationRoute = void 0;
const AuthController_1 = require("../controller/AuthController");
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const route = express_1.Router();
exports.AuthentificationRoute = route;
route.get('/', auth_middleware_1.authMidd, (req, res) => {
    return res.end('<h1>You are logged</h1>');
});
route.post('/login', auth_middleware_1.loginMidd, AuthController_1.AuthController.login);
route.post('/register', auth_middleware_1.registerMidd, AuthController_1.AuthController.register);
