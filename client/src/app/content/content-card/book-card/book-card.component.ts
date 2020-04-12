import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../../../models';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input()
  card_data: Book;

  constructor() { }

  ngOnInit() {
  }

  link() { throw new Error('link() not implemented'); }

}
