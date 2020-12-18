"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const User_1 = __importDefault(require("./src/models/User"));
dotenv_1.config(); //process.env
const user1 = new User_1.default(undefined, "kohler", "nicolas", "nicolas.kohler@ipmie-paris.fr", "password", "nkpohler", "username");
user1.save();
