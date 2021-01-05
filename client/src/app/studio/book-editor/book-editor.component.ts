import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, MaturityRating, ViewAccess } from 'src/models';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ContentService } from '../../shared/services/content.service';

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
  pics: string[] = [];
  book: Omit<Book, '_id'>;
  isEditMode = false;

  get picsLength() {
    return this.pics.length;
  }

  get itemsToOrder() {
    return this.pics.map(url => ({
      img: url,
      text: url.substring(url.lastIndexOf('/') + 1),
      value: url
    }));
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
        isBook: true
      };
      this.reactiveForm();
    }
  }


  onUrls($event) {
    console.log($event);
    // this.pics.push(...$event.map(url => ({img: url, text: url.substring(url.lastIndexOf('/')+1)})))
    this.pics.push(...$event);
    this.form.controls['pages'].setValue(this.itemsToOrder);
  }

  /* Reactive form */
  reactiveForm() {
    // pulling this out of the fb.group(..) call allows for typechecking against the fields in the user model
    const bookFormObj: BookFormObj = {
      title: [this.book.title],
      singleBook: [true],
      coverUrl: new FormControl({ value: this.book.coverUrl, disabled: this.picsLength }),
      shortDesc: [this.book.shortDesc],
      longDesc: [this.book.longDesc],
      maturityRating: [this.book.maturityRating],
      viewAccess: [this.book.viewAccess],
      pages: [this.itemsToOrder || []],
      creatorId: [this.auth.user._id],
      creatorName: [this.book.creatorName],
      isBook: [true]
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

    if (this.isEditMode) {
      this.content.updateBook(this.form.value).subscribe(
        resp => {
          console.log(resp);
        },
      );
    } else {
      this.content.newBook(this.form.value).subscribe(
        resp => {
          console.log(resp);
        },
      );
    }
  }

}
