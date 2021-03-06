import { Controller, Get, Post, Body, Put, Param, Delete, Query, Inject } from '@nestjs/common';
import { Book, User } from '../../models';
import * as constants from '../../constants';
import { Collection, FilterQuery, FindOneOptions, ObjectId } from 'mongodb';
import { ContentEditGuard } from '../../shared/guards/content-edit.guard';
import { MaturityRating, ViewAccess } from '../../models/models';
import { GetUser } from '../../user/user.decorator';

@Controller('book')
@ContentEditGuard(constants.bookCollection)
export class BookController {

    constructor(@Inject(constants.bookCollection) private bookCol: Collection<Book>) {}

    @Post()
    create(@Body() createBook: Book) {
        console.log(createBook);
        // any checking of fields or privledges (beyond what would be caught my the middlewares)
        // add the user as the owner/creator of the book
        // should there be any unique keys on the collection? check those
        // insert

        // THOUGHTS
            // should title be unique, probably there could be a possiblity of wanting the same name for issues in derferent series, if the tite is simple
            // the above is wrong, title should not be unique, there is just no need
            // the need for namescaping can be accomplished with a id of the book within the users id, so they would be short for url use
            // www.<>.com/<user>/b<id>  -- b = book
            // www.lixes.com/324ba34/b1  // 3bill (> than FB uses) can be done with 8 hex chars
            // www.<>.com/<user>/s<id>/<iss#>  // issues must be a number but could be negative,zero, decimal...

        try {
            return this.bookCol.insertOne(createBook);
        } catch (e) {
            console.warn('Error inserting book', e);
            return {result: 'Could not insert book', detail: e}  // TODO: more unified error handling and api response
        }
    }

    @Get()
    findAll(@GetUser() user: User, @Query() query,
        @Query('creator') creator = '',
        @Query('maturity') maturity = '0',
        @Query('access') access = '0',

        @Query('limit') limit = '20',
        @Query('skip') skip = '0',
        @Query('sort') sort: 'TITLE' | 'MATURITY' | 'ACCESS' | 'EDITED' | 'CREATED' = 'CREATED'
    ) {

        /**
        title
        coverUrl
        shortDesc
        longDesc
        maturityRating
        viewAccess
        lastEdited
         */
        // TODO: filter by query

        const isCreator = user && (creator === (user._id.toHexString ? user._id.toHexString() : user._id.toString()));

        const mongoQuery: FilterQuery<Book> = {};

        // creator
        let creatorLs: string[] = [];
        if (typeof creator === 'string') {
            creatorLs = creator.split(',').filter(c => c);  // filter out any empty strings, occurs when this field is empty
        } else {
            creatorLs = creator;
        }
        if (creatorLs && creatorLs.length && creatorLs.length > 1) {
            mongoQuery.creatorId = {$in: creatorLs};
        } else if (creatorLs && creatorLs.length) {
            mongoQuery.creatorId = creatorLs[0];
        }

        // maturity
        mongoQuery.maturityRating = {$lte: +maturity}

        // view
        // the user can only choose the view access when looking at their own books
        mongoQuery.viewAccess = isCreator ? {$lte: +access} : ViewAccess.public;  // TODO: what if the user wants to hide books with certain access?

        // sort
        let sortQuery: FindOneOptions['sort'];
        switch(sort) {
            case 'ACCESS':
                sortQuery = {viewAccess: 1};
                break;
            case 'EDITED':
                sortQuery = {lastEdited: 1};
                break;
            case 'MATURITY':
                sortQuery = {maturityRating: 1};
                break;
            case 'TITLE':
                sortQuery = {title: 1};
                break;
            case 'CREATED':
                sortQuery = {created: 1};
                break;
            default:
                sortQuery = {created: 1};
                break;
        }

        return this.bookCol.find(mongoQuery, {skip: +skip, limit: +limit, sort: sortQuery}).toArray();
        // return this.book_list;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // id = +id;
        // throw `Book with id ${id} not found`;
        return this.bookCol.findOne({_id: ObjectId.createFromHexString(id)});
    }

    @Put()
    update(@Body() updateBook: Book) {
        const _id = updateBook._id;
        try {
            return this.bookCol.replaceOne({_id}, updateBook);
        } catch (e) {
            console.log(`Could not replace book [${_id}]`, e);
            return {result: 'Could not insert book', detail: e}
        }

    }

    @Delete(':id')
    remove(@Param('id') id) {
        throw 'Not Implemented';
    }


    // private book1: Omit<Book, 'maturityRating' | 'title' | 'longDesc' | 'viewAccess'> = {
    //     coverUrl: 'assets/data/notFound.png',
    //     shortDesc: 'This is the coolest fake comicbook and that doesnt exist',
    //     // series_name: 'Fake it till you make it',
    //     // iss_num: 1,
    //     creatorName: 'Fake Comics',
    //     creatorId: '123456',
    //     // series_id: 1234,
    //     pages: [],
    //     isBook: true,
    //     _id: new ObjectId(),   // the in memory service needs an 'id'
    // };

    // private book2: Omit<Book, 'maturityRating' | 'title' | 'longDesc' | 'viewAccess'> = {
    //     coverUrl: 'assets/data/notFound.png',
    //     shortDesc: 'This is the coolest fake comicbook and that doesnt exist',
    //     // series_name: 'Fake it till you make it',
    //     // iss_num: 2,
    //     creatorName: 'Fake Comics',
    //     creatorId: '123456',
    //     // series_id: 1234,
    //     pages: [],
    //     isBook: true,
    //     _id: new ObjectId(),
    // };

    // private book3: Omit<Book, 'maturityRating' | 'title' | 'longDesc' | 'viewAccess'> = {
    //     coverUrl: 'assets/data/notFound.png',
    //     shortDesc: 'This is the coolest fake comicbook and that doesnt exist',
    //     // series_name: 'Fake it till you make it',
    //     // iss_num: 3,
    //     creatorName: 'Fake Comics',
    //     creatorId: '123456',
    //     // series_id: 1234,
    //     pages: [],
    //     isBook: true,
    //     _id: new ObjectId(),
    // };

    // private book4: Omit<Book, 'maturityRating' | 'title' | 'longDesc' | 'viewAccess'> = {
    //     coverUrl: 'https://2.bp.blogspot.com/JafIRnQJ1T2NKRT_XDXWfavYfKUDcrSF32C_lQbv_hMv5f_pwm1V31y30MU9V-pISwA4zH92mAbC=s400',
    //     shortDesc: 'Hellboy seeds of destruction issue 1',
    //     // series_name: 'Hellboy',
    //     // iss_num: 1,
    //     creatorName: 'Dark Horse',
    //     creatorId: '123456',
    //     // series_id: 4321,
    //     _id: new ObjectId(),
    //     isBook: true,
    //     pages: [
    //     {
    //         src: 'https://2.bp.blogspot.com/JafIRnQJ1T2NKRT_XDXWfavYfKUDcrSF32C_lQbv_hMv5f_pwm1V31y30MU9V-pISwA4zH92mAbC=s1600',
    //     },{
    //         src: 'http://2.bp.blogspot.com/l0ohZSKTerYYYPR6B_DYCiA3Zpec7ee7Me9rVTHu4vUTbDFFhlsHdrXZiraRHbkm8Iqy-VvvHY5h=s1600',
    //     },{
    //         src: 'http://2.bp.blogspot.com/chytlg3AVzIZSNylQLkvH4aq9LWDyLbJXp_r_mgZuem3KxABHnW6RVZ7FPsd9BZuM1jyMADl1CWH=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/L45TJ91tVtANbdH3oGlE7h2UiqWlzZH2iOYgWgN0iENwL9Thmt-XQ03kGVsrwJFTeKNvsBSm8gcO=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/khz1LBIv7DMrWSKRIWC9Fwum1gNVRPQBWCxvUachOt7lcafLS7vexapzBAyMjX3WnEhH-BZm6-w3=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/a6lFwmfZBsTYm7C_9p-CTcaM3UxOF86y0-ERsm-MPo1fcP2G2X4y2OsG-vynD2A1buv3RvJNbrMH=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/dXkzaEnc6-fec3pi8xVZEPQrFjvkxjF-gFaF-uW5W0UFZ83XRp2eyPgN_EqkgvzSAka4ra-W6jQ7=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/791cJTyOisLKUalA4kEZw93xjadnxzHetENJYYVQSY1vZUOUTlB3kRubv4Slk31rSWJYUY7Cgxj2=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/ABj7u9Mc70Mn-uo6A-3L6qPHdDZGoiJ22LWVDzOnPk-heHAVNgecm4glaBHuLE1Ldx-foS_x_sPK=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/KifjJEVi1kJzoVhkmgpWMxoIxOjDQeD24IyJo8ZiZM-wBTUBvXoZbx-RBnU5vB91mhfqr9iDzNTN=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/W2b_41Aj4LqZJaHkxrergi-veWvbHnG0R1n3ljfQmK9k9xMs9vq8p-v4yfh5iR6eWVuEI--s2EyC=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/zUHFsNSNTKbtd90mGuvWEegYDzh8hPkOAW9wPkqGT6505CobgQg-rEaR_dOZDueqUP4va7vEqBQ9=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/QiaHlvooPK0Zb3bvHtIDViYwSAOvWuqUa92cMIP1b2_7QO7so0I3mTp3uSUTcCXAbwE9RMeRzfwl=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/-xrSIdaH3xp6sgpC2mS-BDJF0loWLvrvIhEJcD_r8NJCZoYkQ9vMj7UjvMeM3kIlZbaVZFER1NNB=s1600'
    //     },{
    //         src: 'http://2.bp.blogspot.com/Lb9mi58qYSIYYBPm6b6Q3ltMOo30EiPfkXy2mY5D8pQIv0BzdcHX20wgvdCgTpu47rCytg2UwVBY=s1600'
    //     }
    //     ]
    // };

    // private book_list = [this.book1, this.book2, this.book3, this.book4];
}
