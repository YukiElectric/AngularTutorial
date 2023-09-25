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
  productsData : any;
  products : any;

  constructor(
      private route: ActivatedRoute,
      private httpService : HttpService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['name'];
      console.log(this.keyword);
    })

    this.productsData = this.httpService.getProducts({
      name : this.keyword
    })

    this.products = this.productsData.data.docs;
  }

}
