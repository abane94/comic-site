import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../../../models/post';

@Component({
    selector: 'activity-post',
    templateUrl: 'activity.component.html',
    styleUrls: ['activity.component.css']
})

export class ActivityComponent implements OnInit {
    MAX_WIDTH_CHARS = 25;

    @Input()
    activity_data: Post;
    constructor() { }

    ngOnInit() {
        if (!this.activity_data) {
            this.activity_data = new Post({
                user_name: 'asdfqwer',
                // profile_pic: "",
                type: 'text',
                message: 'This is my first post!!!1',
            });
        } else {
            // console.log(JSON.stringify(this.activity_data));
            // console.dir(this.activity_data);
        }

     }

    readMore(): void {
    }

    like() { throw new Error('like() not implemented'); }
    share() { throw new Error('share() not implemented'); }
}

// activity_data =
// {
//     user: "user id",
//     profile_pic: "path to profile pic",
//     type: "text", // share(requires sub_type) | pic | follow (requires another user)
//     message: "this is my first post !!!!!1",
//     liked_by: ["user id", "user id"],
//     extended_message: "this is only needed if the message is too long"
// }
