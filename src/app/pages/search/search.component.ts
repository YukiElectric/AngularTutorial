import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword : string = '';
  page : number = 0;
  products : any;
  pages = {
    limit : 12,
  }

  constructor(
      private httpService : HttpService
    ) { }

  ngOnInit(): void {
    this.httpService.getParmas();

    this.httpService.keyword.subscribe(data => {
      data!=undefined ? this.keyword = data : this.keyword = '';
    })

    this.httpService.page.subscribe(data => {
      data!=undefined ? this.page = data : this.page = 0;
      this.httpService.getProducts({
        name : this.keyword,
        limit : 12,
        page : this.page
      }).subscribe(data => {
        this.products = data.data.docs;
        this.pages = {...this.pages, ...data.data.pages};
      })
    })
  }

}
