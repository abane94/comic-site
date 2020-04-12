import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Book } from '../../../models';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  private id: number;
  constructor(private cont: ContentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      console.log(params.get('id'));
      this.id = params.get('id');

      if (!this.id) {
        new DOMException('NOT FOUND LOlZ');
      }

      this.cont.getBook(this.id).subscribe(
        resp => {
          const book = <Book>resp;
          this.book = book;
        }
      );
    });
  }
}
