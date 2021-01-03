import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Book } from 'src/models';
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

  get picsLength () {
    return this.pics.length;
  }

  get itemsToOrder() {
    return this.pics.map(url => ({
      img: url,
      text: url.substring(url.lastIndexOf('/')+1),
      value: url
    }));
  }

  constructor(public fb: FormBuilder, private auth: AuthenticationService, private content: ContentService) {}

  ngOnInit(): void {
    this.reactiveForm()
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
      title: [''],
      singleBook: [true],
      coverUrl: new FormControl({value: '', disabled: this.picsLength}),
      shortDesc: [''],
      longDesc: [''],
      // gender: ['Male'],
      // dob: [''],
      // grade: [''],
      // subjects: [this.SubjectsArray]
      pages: [this.itemsToOrder || []],
      creatorId: [this.auth.user._id]
    };
    this.form = this.fb.group(bookFormObj);
  }

  submitForm() {
    console.log('submit');
    console.log(this.form.value);
    // TODO: logic will be needed for the whole editor to differential new vs update (editing existing). This will be needed here for PUT vs POST
    this.content.newBook(this.form.value).subscribe(
      resp => {
        console.log(resp);
      },
    );
  }

}
