"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const listAttributSelect_1 = __importDefault(require("../utils/listAttributSelect"));
/**
 *
 *  Class CRUD to database MySql/MariaDB
 * @export
 * @class MySQL
 */
class MySQL {
    /**
     *
     * Insertion of any defined entity
     * @static
     * @param {string} table
     * @param {(User | Asset | Groupe | Message | Conversation)} insert
     * @returns {Promise < number >}
     * @memberof MySQL
     */
    static insert(table, instance) {
        return new Promise((resolve, reject) => {
            const bdd = mysql_1.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                //socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            });
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            });
            console.log("1");
            let data = []; // Stock value
            let columns = "";
            let parameters = "";
            for (const [key, value] of Object.entries(instance)) { // Convert the properties of our objects to an array
                if (instance.attributInsert.indexOf(key) !== -1) { // Check to property to the key array because the children Object will acces property parent
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value);
                    console.log(columns);
                }
            }
            console.log("2");
            columns = columns.slice(0, -1); // delete the last carac.
            parameters = parameters.slice(0, -1);
            bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => {
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                }
                else
                    resolve(results.insertId); // Reponse promise true => then or await
                bdd.end(); // Close database
            });
        });
    }
    /**
     *
     *
     * @static
     * @param {('user' | 'personne')} table
     * @param {*} [where]
     * @returns {*}
     * @memberof MySQL
     */
    static select(table, where) {
        return new Promise((resolve, reject) => {
            const bdd = mysql_1.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                //socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            });
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            });
            let data = []; // Stock value
            let columns = "";
            let conditionWhere = "";
            let parameters = "";
            const key = listAttributSelect_1.default[table].attribut; // select is method to the Class => Array<string>
            for (const champs of key) {
                columns += "`" + champs + "`,";
            }
            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key]);
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.
            columns = columns.slice(0, -1); // delete the last carac.
            const query = bdd.query(`SELECT ${columns} FROM ${table} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => {
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                }
                else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });
        });
    }
    /**
     *
     *
     * @static
     * @param {listeTables} table
     * @param {Array < jointureInterface >} join
     * @param {*} [where]
     * @returns {*}
     * @memberof MySQL
     */
    static selectJoin(table, join, where) {
        return new Promise((resolve, reject) => {
            const bdd = mysql_1.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            });
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            });
            let data = []; // Stock value
            let columns = "";
            let conditionJoin = "";
            let conditionWhere = "";
            let parameters = "";
            const key = listAttributSelect_1.default[table].attribut; // select is method to the Class => Array<string>
            for (const champs of key) {
                columns += "`" + champs + "`,";
            }
            for (let i = 0; i < join.length; i++) {
                let nameTable = join[i].table;
                conditionJoin += `${join[i].type} JOIN ${join[i].table} ON ${join[i].where.table}.${join[i].where.foreignKey} = ${join[i].table}.${listAttributSelect_1.default[nameTable].primaryKey} `;
                for (const champs of listAttributSelect_1.default[nameTable].attribut) {
                    columns += "`" + nameTable + "`.`" + champs + "`,";
                }
            }
            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key]);
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.
            columns = columns.slice(0, -1); // delete the last carac.
            const query = bdd.query(`SELECT ${columns} FROM ${table} ${conditionJoin} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => {
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                }
                else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });
        });
    }
}
exports.default = MySQL;
