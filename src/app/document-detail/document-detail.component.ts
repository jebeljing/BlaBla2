import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService} from '../api.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {

  document = {};
  themeMap: Map<string, string> = new Map<string, string>();
  themes: any;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getDocumentDetails(this.route.snapshot.params['id']);
  }

  getDocumentDetails(id) {
    this.api.getDocument(id)
      .subscribe(data => {
        console.log(data);
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

  deletePhrase(phrase) {
    console.log(phrase);
  }

}
