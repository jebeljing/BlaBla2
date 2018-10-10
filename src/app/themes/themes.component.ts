import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DocumentDataSource } from '../document/document.component';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  themes: any;
  dataSource = new DocumentDataSource(this.api);
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getThemes()
      .subscribe(res => {
        this.themes = res;
      }, err => {
        console.log(err);
      });
  }

}
