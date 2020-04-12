import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../../models';

@Component({
  selector: 'content-card', // idk but this was the selector selector: 'app-content-card',
  // templateUrl: './content-card.component.html',
  template: `<app-book-card [card_data]="card_data"></app-book-card>`,
  // styleUrls: ['./content-card.component.css']
})

// required input object
// {
//   'thumb_lg': 'path/to/large_thumbnail',      // required - maybe use error image
//   'desc_sh': 'this is the short description', // required - reconsidering
//   'series_name': 'The series name',           // required
//   'iss_num': 1, // maybe required for iss
//   'creator_name': 'Aris Husanu',
//   'creator_num': 123456,                      // required
//   'series_id': 789456,                        // required
//   'book_id': 6549872,     // required for iss
//   // <links for api for likeing / readlater>
// }
export class ContentCardComponent implements OnInit {

  @Input()
  // card_data: Object;
  card_data: Book;
  constructor() {}

  ngOnInit() {
    // if not the things it needs get the things

    // implement a info service with a generic get call
    // that returns {'entity name': '<the_property_name>', 'data': <The data to assign the property>}
    // this might need some pretty good security

    // set a new property on the data that is id and equalt to either the series or book id
  }

  follow(): void {
    // send info to a new service that will register the user as following the series or maybe creator
    alert('followed ' + this.card_data['creator_name']);
  }

  link(): void {
    // route to the details page for the book/series
  }

}
