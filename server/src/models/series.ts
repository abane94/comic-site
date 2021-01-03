import { Content } from './helpers';
import { BookWithoutId } from './book';
import { ObjectId } from 'mongodb';

interface SeriesBookMinimal<Id extends string | ObjectId> {
    _id: Id;
    number: number;
    displayNumber: boolean;
    displayTitle: boolean;
}

 type SeriesBook<Id extends string | ObjectId> = SeriesBookMinimal<Id> & BookWithoutId

interface SeriesBase<Id extends string | ObjectId, T extends SeriesBookMinimal<Id> | SeriesBook<Id>> {
	vol?: 1,  // TODO: should this default (user view wise) to 1 or 0
	books: T[];
}

export type SeriesMinimalWithoutId<Id extends string | ObjectId> = SeriesBase<Id, SeriesBookMinimal<Id>>;
export type SeriesWithoutId<Id extends string | ObjectId> = Content & SeriesBase<Id, SeriesBook<Id>>;
