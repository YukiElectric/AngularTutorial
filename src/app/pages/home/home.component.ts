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
  skeleton : boolean = true;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    this.httpService.getProducts({
      limit: 12,
      page : 5,
      "filter[is_featured]": true,
    }).subscribe(data => {
      this.featuredData = data.data.docs;
      this.httpService.getProducts({
        limit: 12,
        page : 5
      }).subscribe(data => {
        this.latestData = data.data.docs;
        this.skeleton = false;
      });
    });
  }

}
