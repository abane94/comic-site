import { Injectable, Inject } from '@nestjs/common';
const CONFIG = require('../../config.json');
import { User } from '../models';
import * as constants from '../constants';
import { Collection } from 'mongodb';

@Injectable()
export class UserService {
    constructor(@Inject(constants.userCollection) private userCol: Collection<User>) {}

    public find(id: string) {
        return users[id];
    }

    public async findGoogle(gid: string) {
        return this.userCol.findOne({gid});
    }

    public insert(id:string, user: User) {
        // if (users[id]) {
        //     throw new Error('User already exits');
        // }
        // users[id] = user;
        return this.userCol.insertOne(user as any); // TODO: come up with interface starategy to deal with ids
    }
}

// export interface User {
//     _id: number;
//     displayName: string;
//     gid: string;
//     token?: object;
// }
const users: {[gid: string]: User} = {};

