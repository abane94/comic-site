import { Injectable, Inject } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket } from '../../node_modules/google-auth-library/build/src/auth/loginticket';
import { UserService } from './user.service';
import { User } from '../models';
import * as JWT from 'jsonwebtoken';
// const CONFIG = require('../../config.json');

@Injectable()
export class AuthService {
    private oAuthClient: OAuth2Client;
    private CLIENT_ID: string; //  = CONFIG.googleClientId;

    constructor(private users: UserService, @Inject('CONFIG') private CONFIG) {
        this.oAuthClient = new OAuth2Client(CONFIG.googleClientId);
        this.CLIENT_ID = CONFIG.googleClientId;
    }

    async authenticateGoogle(obj: Object): Promise<any> {
        console.log(obj);
        let userId = null;
        let payload: LoginTicket;
        try {
            payload = await this.verify(obj['id_token']);
            userId = payload.getUserId();
        } catch(e) { }
        // find the user with the g-id of userId if none exist return a flag to register the new user.
        const user = await this.users.findGoogle(userId);
        return new Promise(resolve => {
            // resolve(userId);
            if (user) {
                delete user.gid;

                const opts: JWT.SignOptions = {
                    algorithm: 'HS256',  // TODO: switch to RSA once keys and key loding logic is in place
                    // keyid?: string;
                    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
                    expiresIn: "2 days",
                    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
                    // notBefore?: string | number;
                    // audience?: '';
                    subject: user.email,
                    issuer: 'com.husanu.aris',
                    // jwtid?: string;
                    // mutatePayload?: boolean;
                    // noTimestamp?: boolean;
                    // header?: object;
                    // encoding?: string;
                };
                let token: string;
                try {
                    token = JWT.sign(user, 'my secret', opts);  // TODO generate secret and use contents from file
                } catch (e) {
                    console.log('Could not sign token', e);
                }
                user.token = token;
            }
            resolve(user || this.getUserFromGoogle(payload));
        });
    }

    getUserFromGoogle(ticket: LoginTicket): Omit<User, '_id'> {
        const payload = ticket.getPayload();
        const user: Omit<User, '_id'> =  {
            givenName: payload.given_name,
            familyName: payload.family_name,
            profilePic: payload.picture,
            token: '',

            email: payload.email,

            gid: ticket.getUserId()
        }
        const opts: JWT.SignOptions = {
            algorithm: 'HS256',  // TODO: switch to RSA once keys and key loding logic is in place
            // keyid?: string;
            /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
            expiresIn: "2 days",
            /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
            // notBefore?: string | number;
            // audience?: '';
            subject: user.email,
            issuer: 'com.husanu.aris',
            // jwtid?: string;
            // mutatePayload?: boolean;
            // noTimestamp?: boolean;
            // header?: object;
            // encoding?: string;
        };
        let token: string;
        try {
            token = JWT.sign(user, 'my secret', opts);  // TODO generate secret and use contents from file
        } catch (e) {
            console.log('Could not sign token', e);
        }
        user.token = token;
        return user;
    }

    private verify(token: string): Promise<LoginTicket> {
        return this.oAuthClient.verifyIdToken({
            idToken: token,
            audience: this.CLIENT_ID,
        })
    }

    public register(user: User) {
        try {
            const ret = this.users.insert(user.gid, user);
            console.log(ret);
            return user;
        } catch (err) {
            return null;
        }
    }
}
