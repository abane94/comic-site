// This file is for the server only and should be the only file that the server uses to access the models
import { ObjectId } from 'mongodb';
import { BookWithoutId } from './book';
import { SeriesWithoutId, SeriesMinimalWithoutId } from './series';
import { UserWithoutId } from './user';
export { MaturityRating, ViewAccess } from './helpers';

interface Id {
    _id: ObjectId;
}

export type Book = BookWithoutId & Id;
export type Series = SeriesWithoutId<ObjectId> & Id;
export type SeriesMinimal = SeriesMinimalWithoutId<ObjectId> & Id;
export type User = UserWithoutId & Id;
