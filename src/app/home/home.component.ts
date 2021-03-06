import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DocumentDataSource } from '../document/document.component';
import { Document } from '../models/Document';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  documents: any;
  document1: any;
  document2: any;
  vocabularyAndPhrases: string[] = [];
  dataSource = new DocumentDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDocuments()
      .subscribe(res => {
        let documents: Document[] = res as Document[];

        documents.sort((d1, d2) => {
          let date1 = new Date(d1.date);
          let date2 = new Date(d2.date);
          if (date1 > date2) return -1;
          else if (date1 == date2) return 0;
          else return 1;
        });
        this.documents = documents.slice(0, 2);
        console.log(documents);

        this.document1 = this.documents[0];
        this.document2 = this.documents[1];
        console.log(this.document1);
        console.log(this.document2);
      }, err => {
        console.log(err);
      });
  }
}
