export interface User {
    id: number;
    first_name: string;
    last_name:string;
    profile_thumb: string;
    token: string;
}

// export class User implements iUser {
//     id: number;
//     first_name: string;
//     last_name:string;
//     profile_thumb: string;
//     token: string;

//     constructor(obj: object) {
//         this.id = obj['id'];
//         this.first_name = obj['first_name'];
//         this.last_name = obj['last_name'];
//         this.token = obj['token'];
//         this.profile_thumb = obj['profile_thumb'];
//     }
// }
