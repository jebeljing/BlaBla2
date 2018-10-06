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
  }

  deleteDocument(id) {
    this.api.deleteDocument(id)
      .subscribe(res => {
        this.router.navigate(['/documents']);
      }, (err) => {
        console.log(err);
      });
  }

  deletePhrase(phrase) {
    console.log(phrase);
  }

}
