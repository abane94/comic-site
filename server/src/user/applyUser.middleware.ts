import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import * as constants from '../constants';
import { Collection } from 'mongodb';
import { User } from '../models';
import * as JWT from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

@Injectable()
export class ApplyUserMiddleware implements NestMiddleware {

    constructor(@Inject(constants.userCollection) private userCol: Collection<User>) {

    }
    async use(req: Request, res: Response, next: Function) {
        const authHeader = req.headers.authorization
        let user: User;
        if (authHeader) {
            const token = authHeader.replace('Bearer', '').trim();
            // decode the token. This is only to get user details, and should not be be considered authenticated
            const decoded = JWT.decode(token);
            const opts: JWT.VerifyOptions = {
                algorithms: ['HS256'],
                subject: decoded['email'],
                issuer: 'com.husanu.aris'
            };

            // verify the token, this will be what is considered authenticated
            try {
                const verified = JWT.verify(token, 'my secret', opts);
                const userId = verified['_id'];// TODO verify token and get user id
                user = await this.userCol.findOne(new ObjectId(userId));  // {_id: new ObjectId(userId)}
                if (user) {
                    req.body.user = user;
                } else {
                    console.log('Could not find user ' + req.body.user);
                }
            } catch (e) {
                console.warn('Could not verify user', e);
            }
            
        }
        next();
    }
}