import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Content } from '../../../src/models/helpers';
import { Book, User } from '../../../src/models';
import { Reflector } from '@nestjs/core';
import { AllCollections } from 'src/data/data-provider-builder';
import { Collection, ObjectId } from 'mongodb';
import { applyDecorators } from '@nestjs/common';
import { UseGuards, SetMetadata } from '@nestjs/common';
import * as constants from '../../constants';
import { Request as ERequest } from 'express';

interface APIRequest<T> {
    value: T;
}

interface Request<T> extends ERequest {
    user: User;
    body: APIRequest<T>
}

function convertToObjectId<T extends {_id: string}>(o: T): Omit<T, '_id'> & {_id: ObjectId} {
    return Object.assign(o, {_id: ObjectId.createFromHexString(o._id)})
}

// this is a helper that is wrapped by the decorator below
@Injectable()
export class ContentEditGuardHelper implements CanActivate {
    constructor(private reflector: Reflector, @Inject(constants.bookCollection)private bookCol: Collection<Book>, @Inject('ALL_COLLECTIONS') private collections: AllCollections) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request<Content & {_id: string }>>();

        // this allows the guard to function as a class level decorator or method level. if both exists the method level trumps the class level
        let collection = this.reflector.get<string>('collection', context.getHandler());
        collection = collection || this.reflector.get<string>('collection', context.getClass());

        const user: User = request.user;
        const content = request.body.value;

        if (!content) { return true; }  // if there is no body, errors will happen else where

        switch((request.method as string).toUpperCase()) {
            case 'GET':
                return true;
                break;
            case 'DELETE':
            case 'PUT':
                // update & delete
                const col = this.collections[collection];
                const old = await col.findOne<Content>({_id: convertToObjectId(content)._id})
                return (old.creatorId === (user._id.toHexString ? user._id.toHexString() : user._id).toString());
                break;
            case 'POST':
                // new
                return content.creatorId && (content.creatorId === user._id.toHexString());
                break;
            default:
                console.warn('ContentEditGuard: unexpected http method: ' + request.method);
                return false;
        }


        return false;  // false defaults to "Forbidden Resource", use exceptions to change the error response
    }
}

export function ContentEditGuard(collection: string) {
  return applyDecorators(
    SetMetadata('collection', collection),
    UseGuards(ContentEditGuardHelper)
  );
}
