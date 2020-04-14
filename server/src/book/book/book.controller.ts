import { Controller, Get, Post, Body, Put, Param, Delete, Query, Inject } from '@nestjs/common';
import { Book } from '../../models';
import * as constants from '../../constants';
import { Collection } from 'mongodb';

@Controller('book')
export class BookController {

    constructor(@Inject(constants.bookCollection) private bookCol: Collection<Book>) {}

    @Post()
    create(@Body() createBook: Book) {
        return 'Not Implemented';
    }

    @Get()
    findAll(@Query() query) {
        // TODO: filter by query
        return this.book_list;
    }

    @Get(':id')
    findOne(@Param('id') id) {
        id = +id;
        for (let i = 0; i < this.book_list.length; i++) {
            let b = this.book_list[i];
            if (b.id === id) {
                return b;
            }
        }
        throw `Book with id ${id} not found`;
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateCatDto) {
        throw 'Not Implemented';
    }

    @Delete(':id')
    remove(@Param('id') id) {
        throw 'Not Implemented';
    }


    private book1: Book = {
        thumb_lg: 'assets/data/notFound.png',
        desc_sh: 'This is the coolest fake comicbook and that doesnt exist',
        series_name: 'Fake it till you make it',
        iss_num: 1,
        creator_name: 'Fake Comics',
        creator_id: 123456,
        series_id: 1234,
        pages: [],
        isBook: true,
        id: 1,   // the in memory service needs an 'id'
    };

    private book2: Book = {
        thumb_lg: 'assets/data/notFound.png',
        desc_sh: 'This is the coolest fake comicbook and that doesnt exist',
        series_name: 'Fake it till you make it',
        iss_num: 2,
        creator_name: 'Fake Comics',
        creator_id: 123456,
        series_id: 1234,
        pages: [],
        isBook: true,
        id: 2,
    };

    private book3: Book = {
        thumb_lg: 'assets/data/notFound.png',
        desc_sh: 'This is the coolest fake comicbook and that doesnt exist',
        series_name: 'Fake it till you make it',
        iss_num: 3,
        creator_name: 'Fake Comics',
        creator_id: 123456,
        series_id: 1234,
        pages: [],
        isBook: true,
        id: 3,
    };

    private book4: Book = {
        thumb_lg: 'https://2.bp.blogspot.com/JafIRnQJ1T2NKRT_XDXWfavYfKUDcrSF32C_lQbv_hMv5f_pwm1V31y30MU9V-pISwA4zH92mAbC=s400',
        desc_sh: 'Hellboy seeds of destruction issue 1',
        series_name: 'Hellboy',
        iss_num: 1,
        creator_name: 'Dark Horse',
        creator_id: 123456,
        series_id: 4321,
        id: 4,
        isBook: true,
        pages: [
        {
            src: 'https://2.bp.blogspot.com/JafIRnQJ1T2NKRT_XDXWfavYfKUDcrSF32C_lQbv_hMv5f_pwm1V31y30MU9V-pISwA4zH92mAbC=s1600',
        },{
            src: 'http://2.bp.blogspot.com/l0ohZSKTerYYYPR6B_DYCiA3Zpec7ee7Me9rVTHu4vUTbDFFhlsHdrXZiraRHbkm8Iqy-VvvHY5h=s1600',
        },{
            src: 'http://2.bp.blogspot.com/chytlg3AVzIZSNylQLkvH4aq9LWDyLbJXp_r_mgZuem3KxABHnW6RVZ7FPsd9BZuM1jyMADl1CWH=s1600'
        },{
            src: 'http://2.bp.blogspot.com/L45TJ91tVtANbdH3oGlE7h2UiqWlzZH2iOYgWgN0iENwL9Thmt-XQ03kGVsrwJFTeKNvsBSm8gcO=s1600'
        },{
            src: 'http://2.bp.blogspot.com/khz1LBIv7DMrWSKRIWC9Fwum1gNVRPQBWCxvUachOt7lcafLS7vexapzBAyMjX3WnEhH-BZm6-w3=s1600'
        },{
            src: 'http://2.bp.blogspot.com/a6lFwmfZBsTYm7C_9p-CTcaM3UxOF86y0-ERsm-MPo1fcP2G2X4y2OsG-vynD2A1buv3RvJNbrMH=s1600'
        },{
            src: 'http://2.bp.blogspot.com/dXkzaEnc6-fec3pi8xVZEPQrFjvkxjF-gFaF-uW5W0UFZ83XRp2eyPgN_EqkgvzSAka4ra-W6jQ7=s1600'
        },{
            src: 'http://2.bp.blogspot.com/791cJTyOisLKUalA4kEZw93xjadnxzHetENJYYVQSY1vZUOUTlB3kRubv4Slk31rSWJYUY7Cgxj2=s1600'
        },{
            src: 'http://2.bp.blogspot.com/ABj7u9Mc70Mn-uo6A-3L6qPHdDZGoiJ22LWVDzOnPk-heHAVNgecm4glaBHuLE1Ldx-foS_x_sPK=s1600'
        },{
            src: 'http://2.bp.blogspot.com/KifjJEVi1kJzoVhkmgpWMxoIxOjDQeD24IyJo8ZiZM-wBTUBvXoZbx-RBnU5vB91mhfqr9iDzNTN=s1600'
        },{
            src: 'http://2.bp.blogspot.com/W2b_41Aj4LqZJaHkxrergi-veWvbHnG0R1n3ljfQmK9k9xMs9vq8p-v4yfh5iR6eWVuEI--s2EyC=s1600'
        },{
            src: 'http://2.bp.blogspot.com/zUHFsNSNTKbtd90mGuvWEegYDzh8hPkOAW9wPkqGT6505CobgQg-rEaR_dOZDueqUP4va7vEqBQ9=s1600'
        },{
            src: 'http://2.bp.blogspot.com/QiaHlvooPK0Zb3bvHtIDViYwSAOvWuqUa92cMIP1b2_7QO7so0I3mTp3uSUTcCXAbwE9RMeRzfwl=s1600'
        },{
            src: 'http://2.bp.blogspot.com/-xrSIdaH3xp6sgpC2mS-BDJF0loWLvrvIhEJcD_r8NJCZoYkQ9vMj7UjvMeM3kIlZbaVZFER1NNB=s1600'
        },{
            src: 'http://2.bp.blogspot.com/Lb9mi58qYSIYYBPm6b6Q3ltMOo30EiPfkXy2mY5D8pQIv0BzdcHX20wgvdCgTpu47rCytg2UwVBY=s1600'
        }
        ]
    };

    private book_list = [this.book1, this.book2, this.book3, this.book4];
}
