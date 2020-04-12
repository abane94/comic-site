import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket } from '../../node_modules/google-auth-library/build/src/auth/loginticket';
import { UserService, User } from './user.service';
const CONFIG = require('../../config.json');

@Injectable()
export class AuthService {
    private oAuthClient: OAuth2Client;
    readonly CLIENT_ID = CONFIG.googleClientId;

    constructor(private users: UserService) {
        this.oAuthClient = new OAuth2Client(CONFIG['googleClientId']);
    }

    async authenticate(obj: Object): Promise<any> {
        console.log(obj);
        let userId = null;
        try {
            const payload = await this.verify(obj['id_token']);
            userId = payload.getUserId();
        } catch(e) { }
        // find the user with the g-id of userId if none exist return a flag to register the new user.
        const user = this.users.find(userId);
        return new Promise(resolve => {
            // resolve(userId);
            resolve(user);
        });
    }

    private verify(token: string): Promise<LoginTicket> {
        return this.oAuthClient.verifyIdToken({
            idToken: token,
            audience: this.CLIENT_ID,
        })
    }

    public register(user: User) {
        try {
            this.users.insert(user.gid, user);
            return user;
        } catch (err) {
            return null;
        }

    }
}
