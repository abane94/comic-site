import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForm()
  }

  
  onUrls($event) {
    console.log($event);
    this.pics.push(...$event)
  }
  
  /* Reactive form */
  reactiveForm() {
    this.form = this.fb.group({
      desc_sh: [''],
      desc_lg: [''],
      // gender: ['Male'],
      // dob: [''],      
      // grade: [''],
      // subjects: [this.SubjectsArray]
    })
  }

  submitForm() {}

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
