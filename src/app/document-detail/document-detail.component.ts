import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService} from '../api.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {

  document = {};
  themeMap: Map<string, string> = new Map<string, string>();
  themes: any;

  commentForm = new FormGroup ({
    name: new FormControl(),
    comment: new FormControl()
  });

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,
    private formBuilder: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    this.getDocumentDetails(this.route.snapshot.params['id']);
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      name: '',
      comment: ''
    });
  }

  getDocumentDetails(id) {
    this.api.getDocument(id)
      .subscribe(data => {
        this.document = data;
      });

    this.api.getThemes()
      .subscribe(res => {
        this.themes = res;
        this.themes.forEach(theme => {
          this.themeMap.set(theme.name, theme.class);
        });
      }, err => {
        console.log(err);
      });
  }

  deleteDocument(id) {
    this.api.deleteDocument(id)
      .subscribe(res => {
        this.router.navigate(['/documents']);
      }, (err) => {
        console.log(err);
      });
  }

  updateLikes(id, document) {
    if (document.likes == undefined) {
      document.likes = 0;
    }
    document.likes = document.likes + 1;
    this.api.updateDocument(id, document)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  updateDislikes(id, document) {
    if (document.dislikes == undefined) {
      document.dislikes = 0;
    }
    document.dislikes = document.dislikes + 1;
    this.api.updateDocument(id, document)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  onFormSubmit(document, comment) {
    comment.date = new Date();
    console.log(comment);
    if (document.comments == undefined) {
      document.comments = [];
    }
    document.comments.push(comment);
    this.api.updateDocument(document._id, document)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  deleteComment(document, id) {
    document.comments = document.comments.filter(cmt => cmt._id != id);
    this.api.updateDocument(document._id, document)
      .subscribe(res => {
      }, err => {
        console.log(err);
      });
  }

  generateMp3(body, title) {
    this.api.generateMp3(body, title).subscribe(
      res => {
        console.log("Mp3 generated!");
      }, err => {
        console.log("Error????");
        console.log(err);
      }
    )
  }

  pauseMp3(title) {
    this.api.pauseMp3(title).subscribe(
      res => {
        console.log(`${title}.mpe paused`);
      }, err => {
        console.log(err);
      }
    )
  }


  deletePhrase(phrase) {
    console.log(phrase);
  }

}
