import { Provider } from "@nestjs/common";
import { Collection, Db, MongoClient } from "mongodb";
import * as constants from '../constants';
export type AllCollections = { [collectionName: string]: Collection };
const collections = constants.collections

let db: Db;

export function buildDataProviders() {
    const providers: Provider[] = collections.map(col => {
        return {
            provide: col,
            useFactory: async (config: object) => {
                if (!db) {
                    db = (await (await MongoClient.connect(config['mongoUrl'])).db(config['dbName']));
                }
                return db.collection(col);
            },
            inject: ['CONFIG']
        }
    });

    providers.push({
        provide: 'ALL_COLLECTIONS',
        inject: collections,
        useFactory: (...collectionObjects: Collection[]) =>{
            const val: { [name: string]: Collection} = {};
            for (let i = 0; i < collections.length; i++) {
                const colName = collections[i];
                val[colName] = collectionObjects[i];
            }
            return val;
        }
    })

    return providers;
}
