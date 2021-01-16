import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { ContentService } from '../../shared/services/content.service';

import { Book } from '../../../models';

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Keyboard, HashNavigation, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, Keyboard, HashNavigation]);


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
      this.cont.getBook(params.get('id')).subscribe(
        resp => {
          this.book = <Book>resp;
          this.images = this.book.pages.map(page=>{ return page.src});
        }
      );
    });
  }

}


/** https://github.com/nolimits4web/swiper/blob/master/src/types/swiper-options.d.ts
To Implement
  updateOnWindowResize?: boolean;
  initialSlide?: number;
  direction?: 'horizontal' | 'vertical';
 preloadImages?: boolean;
 lazy?: LazyOptions
 navigation?: NavigationOptions | boolean;
hashNavigation
*/
