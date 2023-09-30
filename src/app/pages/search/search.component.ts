import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword : string = '';
  products : any;
  pages = {
    limit : 12,
  }

  constructor(
      private route: ActivatedRoute,
      private httpService : HttpService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['name'];
    })

    this.httpService.getProducts({
      name : this.keyword,
      limit : 12
    }).subscribe(data => {
      this.products = data.data.docs;
      this.pages = {...this.pages, ...data.data.pages};
    })

  }

}
