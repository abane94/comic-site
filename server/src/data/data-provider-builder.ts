import { Db, MongoClient } from "mongodb";
import * as constants from '../constants';

const collections = constants.collections

let db: Db;

export function buildDataProviders() {
    return collections.map(col => ({
        provide: col,
        useFactory: async (config: object) => {
            if (!db) {
                db = (await (await MongoClient.connect(config['mongoUrl'])).db(config['dbName']));
            }
            return db.collection(col);
        },
        inject: ['CONFIG']
    }));
}