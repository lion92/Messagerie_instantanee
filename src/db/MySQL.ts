import { createConnection, Connection } from 'mysql';
import Asset from '../models/Asset';
import Image from '../models/Image';
import Video from '../models/Video';



export default class MySQL {

    static insert(table: string, insert: Image|Video|Asset): Promise < number > {
        return new Promise((resolve, reject) => {

            const bdd: Connection = createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL)
            })
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            })

        
            let data = []
            let columns = "";
            let parameters = "";

            for (const [key, value] of Object.entries(insert)) {
                if (insert.attribut.indexOf(key) !== -1) {
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    console.log("colonne: "+columns+"parameter: "+parameters);
                    data.push(value)
                }
            }
            console.log(data);
            columns = columns.slice(0, -1);
            parameters = parameters.slice(0, -1);

            const query = bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => {
                if (error)
                    console.log(error);
                else
                    resolve(results.insertId)
                bdd.end();
            });

        })

    }


}