import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private featuredData: any;
  private latestData: any;

  featuredProduct: any;
  latestProduct: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.featuredData = this.httpService.getProducts({
      limit: 6,
      "filter[is_featured]": true,
    });

    this.latestData = this.httpService.getProducts({
      limit : 6,
    })

    this.featuredProduct = this.featuredData.data.docs;

    this.latestProduct = this.latestProduct.data.docs;
  }

}
