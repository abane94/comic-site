import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { User } from '../../models';
import { AuthService } from '../auth.service';

@Controller('user')
export class UserController {

    constructor(private readonly auth: AuthService){}
    @Post()
    create(@Body() createUser) {
        console.log(createUser);
        const res = this.auth.register(createUser);
        return res;
        // return 'Not Implemented';
    }

    @Get()
    findAll(@Query() query) {
        // TODO: filter by query
        console.log(query);
        const givenName = query.givenName;
        for (let i = 0; i < this.user_list.length; i++) {
            const b = this.user_list[i];
            if (b.givenName.toUpperCase() === givenName.toUpperCase()) {
                return b;
            }
        }
        throw `User with name ${givenName} not found`;
        // return this.user_list;
    }

    @Get(':id')
    findOne(@Param('id') id) {
        id = +id;
        for (let i = 0; i < this.user_list.length; i++) {
            const b = this.user_list[i];
            if (b._id === id) {
                return b;
            }
        }
        throw `User with id ${id} not found`;
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateCatDto) {
        throw 'Not Implemented';
    }

    @Delete(':id')
    remove(@Param('id') id) {
        throw 'Not Implemented';
    }

    @Post('/auth')
    async authenticate(@Body() body) {
        // TODO: specify that this is for google
        return this.auth.authenticateGoogle(body);
    }


    private user1: Omit<User, 'email'> = {
        'givenName': 'Aris',
        'familyName': 'Husanu',
        'profilePic': 'some location',
        'token': '12345',
        '_id': new ObjectId()
    };

    private user2: Omit<User, 'email'> = {
        'givenName': 'Sage',
        'familyName': 'Husanu',
        'profilePic': 'some location',
        'token': '12345',
        '_id': new ObjectId()
    };

    private user3: Omit<User, 'email'> = {
        'givenName': 'Neoh',
        'familyName': 'Husanu',
        'profilePic': 'some location',
        'token': '12345',
        '_id': new ObjectId()
    };

    private user4: Omit<User, 'email'> = {
        'givenName': 'Mclovin',
        'familyName': '',
        'profilePic': 'some location',
        'token': '12345',
        '_id': new ObjectId()
    };

    private user5: Omit<User, 'email'> = {
        'givenName': 'Stud',
        'familyName': 'Muffin',
        'profilePic': 'some location',
        'token': '12345',
        '_id': new ObjectId()
    };

    private user_list = [this.user1, this.user2, this.user3, this.user4, this.user5];
}
