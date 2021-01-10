import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Book } from '../../../models';
import { ContentService } from '../../shared/services/content.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MaturityRating, ViewAccess } from '../../../../../server/src/models/helpers';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookListComponent implements OnInit {
  // dataSource = ELEMENT_DATA;
  columnsToDisplay = ['title', 'shortDesc', 'maturityRating', 'viewAccess', 'created', 'lastEdited'];  // todo: page count
  expandedElement: Book | null;
  public books: Book[];
  allColumns = [...this.columnsToDisplay, 'edit', 'delete'];

  titleDisplay = {
    title: 'Title',
    shortDesc: 'Blurb',
    maturityRating: 'Maturity Rating',
    viewAccess: 'View Access',
    created: 'Created Date',
    lastEdited: 'Last Edited Date',
    edit: 'Edit'
  }

  dataDisplay: { [column: string]: (b: Book)=> string } = {
    // title: (b: Book) => b.title,
    shortDesc: (b: Book) => b.shortDesc,
    maturityRating: (b: Book) => MaturityRating[b.maturityRating],
    viewAccess: (b: Book) => ViewAccess[b.viewAccess],
    created: (b: Book) => b.created ? new Date(b.created).toDateString() : '-',
    lastEdited: (b: Book) => b.lastEdited ? new Date(b.lastEdited).toDateString() : '-',
  }


  constructor(private content: ContentService, private auth: AuthenticationService) {
    this.content.getBooks(this.auth.user._id, MaturityRating.M, ViewAccess.private).subscribe(
      resp => {
        this.books = resp;
      },
      err => {
        console.log('Could not get books', err);
      }
    )
  }

  ngOnInit(): void {
  }

  deleteBook(b: Book, $event) {
    $event.stopPropagation();
    if (confirm(`Are you sure you want to delete ${b.title}?`) && confirm(`Are you really sure? This cannot be undone!`)) {
      // this.content.deleteBook(b._id);
    }
  }

}
