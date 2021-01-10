import { Content } from './helpers';

interface Page {
    src: string;
    name: string;
}

export interface BookBase {
    singleBook?: boolean;
    pages: Page[];
    isBook: true;
}
export interface BookWithoutId extends Content, BookBase {}
// NOTE: it could be better to store the analytics in a separate collection, not clutter the business data, and lock the analytics down easier to the creator
