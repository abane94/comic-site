import { Injectable } from '@nestjs/common';
const CONFIG = require('../../config.json');

@Injectable()
export class UserService {
    constructor() {}

    public find(id: string) {
        return users[id];
    }

    public insert(id:string, user: User) {
        if (users[id]) {
            throw new Error('User already exits');
        }
        users[id] = user;
    }
}

export interface User {
    _id: number;
    displayName: string;
    gid: string;
    token?: object;
}
const users: {[gid: string]: User} = {};

