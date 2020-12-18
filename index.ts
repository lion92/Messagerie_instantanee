import { config } from "dotenv";
import User from './src/models/User';
import MySQL from './src/db/MySQL';
config(); //process.env


try {
    const user1 = new User(null, "kohler", "gilles", "nicolas.kohler@imie-paris.fr", "password", "nkohler", "username");

    //user1.save();
    //User.select(user1);
    User.select({nom: "kohler"});
} catch (error) {
    console.log(error);
}