import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { Post as PostModel } from '../../models';

@Controller('feed')
export class FeedController {

    @Post()
    create(@Body() createBook) {
        return 'Not Implemented';
    }

    @Get()
    findAll(@Query() query) {
        // TODO: filter by query
        return this.postList;
    }

    @Get(':id')
    findOne(@Param('id') id) {
        id = +id;
        for (let i = 0; i < this.postList.length; i++) {
            let b = this.postList[i];
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


    private post1: PostModel = {
        id: 1,
        user_id: 1,
        user_name: 'Aris Husanu',
        profile_pic: 'http://www.priorlakeassociation.org/wp-content/uploads/2011/06/blank-profile.png',
        type: 'text', // share(requires sub_type) | pic | follow (requires another user)
        message: 'this is my first post !!!!!1',
        likes: [2, 4],
        extended_message: 'this is only needed if the message is too long'
      };

      private post2: PostModel = {
        id: 2,
        user_id: 2,
        user_name: 'Sage Husanu',
        profile_pic: 'http://www.priorlakeassociation.org/wp-content/uploads/2011/06/blank-profile.png',
        type: 'text', // share(requires sub_type) | pic | follow (requires another user)
        message: 'Thought I\'d give this place a chance... and it sucks',
        likes: [1, 4],
        extended_message: 'this is only needed if the message is too long'
      };

      private post3: PostModel = {
        id: 3,
        user_id: 3,
        user_name: 'Neoh Husanu',
        profile_pic: 'http://www.priorlakeassociation.org/wp-content/uploads/2011/06/blank-profile.png',
        type: 'text', // share(requires sub_type) | pic | follow (requires another user)
        message: 'Yo, check out the new issue of Batman!',
        likes: [],
        extended_message: 'this is only needed if the message is too long'
      };

      private post4: PostModel = {
        id: 4,
        user_id: 1,
        user_name: 'Aris Husanu',
        profile_pic: 'http://www.priorlakeassociation.org/wp-content/uploads/2011/06/blank-profile.png',
        type: 'text', // share(requires sub_type) | pic | follow (requires another user)
        message: 'This is going to be a really super really big extra long really super really big extra'
          + ' long really super really big extra long really super really big extra long really super really'
          + ' big extra long really super really big extra long really super really big extra long really'
          + ' super really big extra long really super really big extra long really super really big extra long'
          + ' really super really big extra long really super really big extra long really super really big extra'
          + ' long really super really big extra long really super really big extra long really super really big'
          + ' extra long really super really big extra long really super really big extra long really super really'
          + ' big extra long really super really big extra long really super really big extra long really super'
          + ' really big extra long post',
        likes: [],
        extended_message: 'this is only needed if the message is too long'
      };

      private postList = [this.post1, this.post2, this.post3, this.post4];

}
