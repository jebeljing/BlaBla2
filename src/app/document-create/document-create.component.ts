import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

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
  date: string = '';

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
  }

  onFormSubmit(form: NgForm) {
    this.api.postDocument(form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/document-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

}
