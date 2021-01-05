export { Post } from '../../server/src/models/post';  // TODO: remove all Post logic and concepts
export { MaturityRating, ViewAccess } from '../../server/src/models/helpers';
import { BookWithoutId } from '../../server/src/models/book';
import { SeriesWithoutId, SeriesMinimalWithoutId } from '../../server/src/models/series';
import { UserWithoutId } from '../../server/src/models/user';

interface Id {
    _id: string;
}

export type Book = BookWithoutId & Id;
export type Series = SeriesWithoutId<string> & Id;
export type SeriesMinimal = SeriesMinimalWithoutId<string> & Id;
export type User = UserWithoutId & Id;
