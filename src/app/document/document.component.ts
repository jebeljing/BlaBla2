import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents: any;
  displayedColumns = ['theme', 'title', 'vocabulary', 'phrases'];
  dataSource = new DocumentDataSource(this.api);
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDocuments()
      .subscribe(res => {
        console.log(res);
        this.documents = res;
      }, err => {
        console.log(err);
      });
  }

  deleteDocument(id) {
    this.api.deleteDocument(id)
      .subscribe(res => {
        this.api.getDocuments()
          .subscribe(res => {
            this.documents = res;
          }, err => {
            console.log(err);
          });
      }, (err) => {
        console.log(err);
      });
  }

}

export class DocumentDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getDocuments();
  }

  disconnect() {

  }
}
