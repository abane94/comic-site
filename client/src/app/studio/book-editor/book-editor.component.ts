import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ContentService } from '../../shared/services/content.service';

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
    this.form = this.fb.group({
      title: [''],
      singleBook: [true],
      thumb_lg: new FormControl({value: '', disabled: this.picsLength}),
      desc_sh: [''],
      desc_lg: [''],
      // gender: ['Male'],
      // dob: [''],      
      // grade: [''],
      // subjects: [this.SubjectsArray]
      pages: [this.itemsToOrder || []],
      creator_id: [this.auth.user._id]
    })
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

// id?: number;
// thumb_lg: string;
// desc_sh: string;
// desc_lg?: string;
// series_name: string;
// series_id: number;
// creator_id: number;
// creator_name: string;
// pages: Array<iPageInfo>;
// iss_num: number;

// isBook: true;
