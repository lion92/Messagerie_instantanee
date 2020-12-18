"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const Asset_1 = __importDefault(require("./src/models/Asset"));
dotenv_1.config(); //process.env
const app = express_1.default();
const asset = new Asset_1.default(null, "");
