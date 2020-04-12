import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { ContentService } from '../../shared/services/content.service';

import { Book } from '../../../models';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})

// required input object
/*
{
  'query': 'query used to fill this grid can be and artist/series/user_suggestions/popular/new/search',
  'cards': [{list of card data},{},{}],
  'sort_options': [list of sort options],
  'sort': 'the selected sort option
}
*/
export class CardGridComponent implements OnInit {

  @Input()
  grid_data: {cards: Book[], query: string };
  @Input()
  grid_query: string;

  constructor(private cont: ContentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    console.log('after get param');

    if (this.grid_data) {
      if (!this.grid_data['cards']) {
        if (typeof this.grid_data !== 'string') {
          throw new Error('input type error');
        }
        this.grid_query = this.grid_data;
        // let data: object;
        this.cont.getBooks(this.grid_query).subscribe(
          resp => {
            const cards = <Array<Book>>resp;
            this.grid_data = { cards: cards, query: this.grid_query };
          }
        );
      }
    } else {
      this.activatedRoute.paramMap.subscribe((params: Params) => {
        console.log(params.get('id'));
        console.log(params.get('query')); // query params are seperated by semicolon (;) not question mark (?)
        console.dir(params);
        this.grid_query = params.get('query');
        if (!this.grid_query) {
          this.grid_query = '';
        }
        // let data: object;
        this.cont.getBooks(this.grid_query).subscribe(
          resp => {
            const cards = <Array<Book>>resp;
            this.grid_data = { cards: cards, query: this.grid_query };
          }
        );
      });
    }
  }

  reload() { throw new Error('reload() not implemented'); }
}
