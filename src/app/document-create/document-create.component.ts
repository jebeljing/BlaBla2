import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss']
})
export class DocumentCreateComponent implements OnInit {

  documentForm: FormGroup;
  theme: string = '';
  title: string = '';
  body: string = '';
  vocabulary: string[] = [];
  phrases: string[] = [];
  author: string = '';
  date: string='';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      'theme': [null],
      'title': [null, Validators.required],
      'author': [null],
      'vocabulary': [null],
      'phrases': [null],
      'date': [null],
      'body': [null, Validators.required]
    });
    
    var datePipe = new DatePipe('en-US');
    this.date = datePipe.transform(new Date(),'MM/dd/yyyy');
  }

  onFormSubmit() {
    console.log(this.documentForm.value);
    if (this.documentForm.value.vocabulary != null) {
      this.documentForm.controls['vocabulary']
        .setValue(this.documentForm.value.vocabulary.split(","));
    }
    if (this.documentForm.value.phrases != null) {
      this.documentForm.controls['phrases']
        .setValue(this.documentForm.value.phrases.split(","));
    }

    // if (this.documentForm.value.theme != null) {
    //   this.documentForm.controls['theme']
    //     .setValue({"name": this.documentForm.value.theme});
    // }
    
    this.api.postDocument(this.documentForm.value)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/document-details', id]);
      }, (err) => {
        console.log(err);
    });
  }

}
