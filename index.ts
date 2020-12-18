import { config } from "dotenv";
import User from './src/models/User';

User user1 = new User("kohler", "nicolas", "nicolas.kohler@imie-paris.fr", "password", "nkohler");

//config(); //process.env