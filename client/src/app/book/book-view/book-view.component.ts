import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { ContentService } from '../../shared/services/content.service';

import { Book } from '../../../../models/book';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  private book: Book;
  images: Array<string>;
  constructor(private cont: ContentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      console.log(params.get('id'));
      console.dir(params);
      this.cont.getBook(+params.get('id')).subscribe(
        resp => {
          this.book = <Book>resp;
          this.images = this.book.pages.map(page=>{ return page.src});
        }
      );
    });
  }

}
