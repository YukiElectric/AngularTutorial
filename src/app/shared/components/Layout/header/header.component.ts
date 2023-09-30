import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})

export class HeaderComponent implements OnInit{
  keyword : string = '';
  countCart : number = 0;


  constructor(private router : Router,
    private httpService : HttpService,
    ) {}

  ngOnInit(): void {
    this.httpService.updateCountCart();
    this.httpService.countCart.subscribe(data => {
      this.countCart = data;
    })
  }

  onClickEvent() {
    this.router.navigate(['/Search'], {queryParams: {name: this.keyword}});
    this.keyword = '';
  }


}
