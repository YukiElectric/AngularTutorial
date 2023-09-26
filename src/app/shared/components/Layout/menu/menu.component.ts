import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories : any;

  constructor (private httpService : HttpService) {}

  ngOnInit(): void {
    this.httpService.getCategories({}).subscribe(data => {
      this.categories = data.data.docs;   
    });
  }

}
