"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class MySQL {
    static insert(table, insert) {
        return new Promise((resolve, reject) => {
            const bdd = mysql_1.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL)
            });
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            });
            let key = Object.keys(insert);
            let data = [];
            let columns = "";
            let parameters = "";
            for (const [key, value] of Object.entries(insert)) {
                if (insert.attribut.indexOf(key) !== -1) {
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value);
                }
            }
            columns = columns.slice(0, -1);
            parameters = parameters.slice(0, -1);
            const query = bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => {
                if (error)
                    console.log(error);
                else
                    resolve(results.insertId);
                bdd.end();
            });
        });
    }
}
exports.default = MySQL;
