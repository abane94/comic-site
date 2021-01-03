// export { Book } from './models/book';
export { Post } from './models/post';
// export { User } from './models/user';

import { ObjectId } from 'mongodb';
import { BookWithoutId } from '../src/models/book';
import { SeriesWithoutId, SeriesMinimalWithoutId } from '../src/models/series';
import { UserWithoutId } from '../src/models/user';

interface Id {
    _id: ObjectId;
}

export type Book = BookWithoutId & Id;
export type Series = SeriesWithoutId<ObjectId> & Id;
export type SeriesMinimal = SeriesMinimalWithoutId<ObjectId> & Id;
export type User = UserWithoutId & Id;
