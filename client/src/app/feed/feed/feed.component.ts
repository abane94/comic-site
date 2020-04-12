import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { FeedService } from '../../shared/services/feed.service';

import { Post } from '../../../../models/post';

@Component({
    selector: 'activity-feed',
    templateUrl: 'feed.component.html',
    styleUrls: ['feed.component.css']
})

export class FeedComponent implements OnInit {

    @Input()
    feed_data: {posts: Post[], query: string};

    @Input()
    feed_query: string;
    constructor(private cont: FeedService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
            this.activatedRoute.paramMap.subscribe((params: Params) => {
                console.log(params.get('id'));
                console.log(params.get('query')); // query params are seperated by semicolon (;) not question mark (?)
                console.dir(params);
                // query precedents
                // input query > url param query > empty('') query
                if (!this.feed_query) {
                    const param_query = params.get('query');
                    this.feed_query = param_query ? param_query : '';
                }
                if (!this.feed_data) { // inputed feed_data has highest precedents
                    this.cont.getFeed(this.feed_query)
                    .subscribe(results => {
                        console.log(results);
                        const posts = <Array<Post>>results;
                        this.feed_data = {posts: posts, query: this.feed_query};
                    });
                }
            });
     }

     reload() {
        throw new Error('reload() not implemented'); 
     }
}
