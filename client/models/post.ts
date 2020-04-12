interface iPost {
    id: number;
    user_id: number;
    user_name: string;
    profile_thumb: string;
    type: string;
    message: string;
    likes: Array<number>;
}

export class Post implements iPost {
    id: number;
    user_id: number;
    user_name: string;
    profile_thumb: string;
    type: string;
    message: string;
    likes: Array<number>;
    profile_pic?: string;

    constructor(obj: object) {
        this.id = obj['id'];
        this.user_id = obj['user_id'];
        this.user_name = obj['user_name'];
        this.profile_thumb = obj['profile_thumb'];
        this.type = obj['type'];
        this.message = obj['message'];
        this.likes = obj['likes'];
        this.profile_pic = obj['profile_pic']
    }
}
