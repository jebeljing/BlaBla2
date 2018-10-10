import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DocumentDataSource } from '../document/document.component';

@Component({
  selector: 'app-vocabulary-and-phrases',
  templateUrl: './vocabulary-and-phrases.component.html',
  styleUrls: ['./vocabulary-and-phrases.component.scss']
})
export class VocabularyAndPhrasesComponent implements OnInit {

  vocabularyAndPhrases: string[] = [];
  dataSource = new DocumentDataSource(this.api);
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDocuments()
      .subscribe(res => {
        let documents = res;
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
