import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, MaturityRating, ViewAccess } from 'src/models';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ContentService } from '../../shared/services/content.service';

// TODO: move to a utility types file
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type ElementOf<ArrayType extends readonly unknown[]> = ArrayType[number];

type BookFormObj = {
  [P in keyof Book]?: any;
}
@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  form: FormGroup;
  pics: Book['pages'] = [];
  book: Optional<Book, '_id' | 'title'>;
  isEditMode = false;
  availablePics: string[] = [];
  @ViewChild('availablePicsList', {static: true}) list: MatSelectionList;
  hoveringOn: ({x: number; y:number} | null)[] = [];

  // proxies to enums that are used in the template
  maturityRating = MaturityRating;
  viewAccess = ViewAccess;

  get picsLength() {
    return this.availablePics.length;
  }

  constructor(
    public fb: FormBuilder,
    private auth: AuthenticationService,
    private content: ContentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.content.getBook(id).toPromise().then(book => {
        this.book = book;
        this.availablePics = [...this.availablePics, book.coverUrl, ... book.pages.map(p => p.src || (p as any).value)]
        if (this.availablePics.length) {
          this.form?.controls?.coverUrl.enable()
        }
        this.reactiveForm();
      })

    } else {
      this.book = {
        title: '',
        coverUrl: '',
        shortDesc: '',
        longDesc: '',
        maturityRating: MaturityRating.M,
        viewAccess: ViewAccess.private,
        creatorId: this.auth.user._id,
        creatorName: this.auth.user.givenName + ' ' + this.auth.user.familyName,
        pages: [],
        isBook: true,
        lastEdited: (new Date()).toISOString(),
        created: (new Date()).toISOString()
      };
      this.reactiveForm();
    }
  }

  ordererGetImg = (page: ElementOf<Book['pages']>): string => {
    return page?.src || '';
  }

  ordererGetText = (page: ElementOf<Book['pages']>): string => {
    return page?.name || '';
  }


  onUrls($event) {
    this.availablePics.push(...$event);
    if (this.availablePics.length) {
      this.form?.controls?.coverUrl.enable()
    }
  }

  mouseHover(i: number, $event) {
    console.log(i);
    this.hoveringOn[i] = {x: $event.clientX, y: $event.clientY};
  }

  mouseLeave(i: number, $event) {
    console.log(i);
    this.hoveringOn[i] = null;
  }

  addSelected(selection: MatListOption[]) {
    this.pics.push(...selection.map(s => s.value).map(url => ({
      src: url,
      name: url.substring(url.lastIndexOf('/') + 1),
    })));
    this.form.controls['pages'].setValue(this.pics);
    this.list.deselectAll();
  }

  /* Reactive form */
  reactiveForm() {
    // pulling this out of the fb.group(..) call allows for typechecking against the fields in the user model
    const bookFormObj: BookFormObj = {
      _id: [this.book._id || ''],
      title: [this.book.title],
      singleBook: [true],
      coverUrl: new FormControl({ value: this.book.coverUrl, disabled: !this.availablePics.length }),
      shortDesc: [this.book.shortDesc],
      longDesc: [this.book.longDesc],
      maturityRating: [this.book.maturityRating],
      viewAccess: [this.book.viewAccess],
      pages: [this.book.pages || []],
      creatorId: [this.auth.user._id],
      creatorName: [this.book.creatorName],
      isBook: [true],
      lastEdited: [this.book.lastEdited || (new Date()).toISOString()],
      created: [this.book.created]
    };
    this.form = this.fb.group(bookFormObj);
    if (this.book.creatorName !== (this.auth.user.givenName + ' ' + this.auth.user.familyName)) {
      // This will enable the creator name on the book to be changed if the users name changes
      // TODO: should the display name be used for book instead?
      this.form.controls['creatorName'].setValue(this.auth.user.givenName + ' ' + this.auth.user.familyName);
    }
  }

  submitForm() {
    console.log('submit');
    console.log(this.form.value);
    // TODO: logic will be needed for the whole editor to differential new vs update (editing existing). This will be needed here for PUT vs POST

    const content: Book = this.form.value;
    content.lastEdited = (new Date()).toISOString();
    if (this.isEditMode) {
      this.content.updateBook(content).subscribe(
        resp => {
          console.log(resp);
        },
      );
    } else {
      delete content._id;
      this.content.newBook(content).subscribe(
        resp => {
          console.log(resp);
        },
      );
    }
  }

}
