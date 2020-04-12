import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from 'models/user';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {

    @Input()
    profile_data: User;
    profile_id: number;

    constructor(private auth: UserService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: Params) => {
            console.log(params.get('id'));
            console.dir(params);
            this.profile_id = parseInt(params.get('id'), 10);
            this.auth.getProfile(this.profile_id)
            .subscribe(
                resp => {
                    this.profile_data = {posts: resp}.posts;
                }
            );
        });


     }
}
