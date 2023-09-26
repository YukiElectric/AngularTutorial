import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredData: any;
  latestData: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    this.httpService.getProducts({
      limit: 6,
      "filter[is_featured]": true,
    }).subscribe(data => {
      this.featuredData = data.data.docs;
    });

    this.httpService.getProducts({
      limit: 6,
    }).subscribe(data => {
      this.latestData = data.data.docs;
    });

  }

}
