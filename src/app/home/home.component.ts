import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DocumentDataSource } from '../document/document.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  documents: any;
  vocabularyAndPhrases: string[] = [];
  dataSource = new DocumentDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDocuments()
      .subscribe(res => {
        let documents = res;
        console.log(documents);
        documents.sort((d1, d2) => d1.vocabulary.length < d2.vocabulary.length);
        console.log(documents);

        documents.forEach(document => {
          document.vocabulary.forEach(word => {
            this.vocabularyAndPhrases.push(word);
          });
          document.phrases.forEach(phrase => {
            this.vocabularyAndPhrases.push(phrase);
          });
        });
        
      }, err => {
        console.log(err);
      });
  }

}
