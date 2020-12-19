import { createConnection, Connection, ConnectionConfig } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
import User from '../models/User';
import Asset from '../models/Asset';
import Groupe from '../models/Groupe';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

export interface jointureInterface {
    type: 'LEFT' | 'RIGHT' | 'FULL' | 'INNER';
    where: {
        table: listeTables;
        foreignKey: string;
    }
    table: listeTables;
}

/**
 *
 *  Class CRUD to database MySql/MariaDB
 * @export
 * @class MySQL
 */
export default abstract class MySQL {

    static param_db(): ConnectionConfig {
        let bdd: ConnectionConfig =
        { // Init params to database
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            //socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
            port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
        }
        return bdd;
    }

    /**
     *
     * Insertion of any defined entity
     * @static
     * @param {string} table
     * @param {(User | Asset | Groupe | Message | Conversation)} insert
     * @returns {Promise < number >}
     * @memberof MySQL
     */
    static insert(table: string, instance: User | Asset | Groupe | Message | Conversation): Promise<number> {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"

            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                //socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            });

            let data = []; // Stock value
            let columns = "";
            let parameters = "";

            for (const [key, value] of Object.entries(instance)) { // Convert the properties of our objects to an array
                if (instance.attributInsert.indexOf(key) !== -1) { // Check to property to the key array because the children Object will acces property parent
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value);
                }
            }
            columns = columns.slice(0, -1); // delete the last carac.
            parameters = parameters.slice(0, -1);
            bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => { // excute request sql

                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results.insertId); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

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
    static select(table: listeTables, where?: any): Promise<Array<User>> {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                //socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionWhere = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key]);
            }

            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.
            const query = bdd.query(`SELECT ${columns} FROM ${table} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }
//Si physiquement vous etiez le reflet l'une de lautre, magiquement vous etiez diametralement l'opposée
    
    static delete(table: listeTables, where?: Object): Promise<number> {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection(this.param_db());
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionWhere = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            //faire
            console.log(where);
            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                console.log(key);
                data.push(where.toString());
            }

            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.
            console.log(`DELETE FROM ${table} WHERE ${conditionWhere} ;` + data);
            columns = columns.slice(0, -1); // delete the last carac.
            const query = bdd.query(`DELETE FROM ${table} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results.affectedRows); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

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
    static selectJoin(table: listeTables, join: Array<jointureInterface>, where?: any): any {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionJoin = "";
            let conditionWhere = "";

            let parameters = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            for (let i = 0; i < join.length; i++) {
                let nameTable = join[i].table
                conditionJoin += `${join[i].type} JOIN ${join[i].table} ON ${join[i].where.table}.${join[i].where.foreignKey} = ${join[i].table}.${listAttributSelect[nameTable].primaryKey} `;
                for (const champs of listAttributSelect[nameTable].attribut) {
                    columns += "`" + nameTable + "`.`" + champs + "`,";
                }
            }

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table} ${conditionJoin} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

}