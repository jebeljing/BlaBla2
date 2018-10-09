import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {

  documentForm: FormGroup;
  id: string = '';
  theme: string = '';
  title: string = '';
  body: string = '';
  author: string = '';
  date: string = '';
  vocabulary: string[] = [];
  phrases: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getDocument(this.route.snapshot.params['id']);
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

  getDocument(id) {
    this.api.getDocument(id).subscribe(data => {
      this.id = data._id;
      this.documentForm.setValue({
        theme: data.theme,
        title: data.title,
        body: data.body,
        author: data.author,
        date: data.date,
        vocabulary: data.vocabulary,
        phrases: data.phrases
      });
    });
  }

  onFormSubmit() {
    console.log(this.documentForm.value);
    if (this.documentForm.value.vocabulary != null && this.documentForm.value.vocabulary.length == 1) {
      this.documentForm.controls['vocabulary']
        .setValue(this.documentForm.value.vocabulary[0].split(","));
    }
    if (this.documentForm.value.phrases != null && this.documentForm.value.vocabulary.length == 1) {
      this.documentForm.controls['phrases']
        .setValue(this.documentForm.value.phrases[0].split(","));
    }
    this.api.updateDocument(this.id, this.documentForm.value)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/document-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

  documentDetails() {
    this.router.navigate(['/document-details', this.id]);
  }

}
