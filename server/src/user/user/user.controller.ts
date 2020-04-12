import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
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
        const firstName = query.first_name;
        for (let i = 0; i < this.user_list.length; i++) {
            let b = this.user_list[i];
            if (b.first_name.toUpperCase() === firstName.toUpperCase()) {
                return b;
            }
        }
        throw `User with name ${firstName} not found`;
        // return this.user_list;
    }

    @Get(':id')
    findOne(@Param('id') id) {
        id = +id;
        for (let i = 0; i < this.user_list.length; i++) {
            let b = this.user_list[i];
            if (b.id === id) {
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
        return this.auth.authenticate(body);
    }


    private user1: User = {
        'first_name': 'Aris',
        'last_name': 'Husanu',
        'profile_thumb': 'some location',
        'token': '12345',
        'id': 1
    };

    private user2: User = {
        'first_name': 'Sage',
        'last_name': 'Husanu',
        'profile_thumb': 'some location',
        'token': '12345',
        'id': 2
    };

    private user3: User = {
        'first_name': 'Neoh',
        'last_name': 'Husanu',
        'profile_thumb': 'some location',
        'token': '12345',
        'id': 3
    };

    private user4: User = {
        'first_name': 'Mclovin',
        'last_name': '',
        'profile_thumb': 'some location',
        'token': '12345',
        'id': 4
    };

    private user5: User = {
        'first_name': 'Stud',
        'last_name': 'Muffin',
        'profile_thumb': 'some location',
        'token': '12345',
        'id': 5
    };

    private user_list = [this.user1, this.user2, this.user3, this.user4, this.user5];
}
