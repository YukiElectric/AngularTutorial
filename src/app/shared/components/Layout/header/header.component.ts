import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})

export class HeaderComponent {
  keyword : string = '';

  constructor(private router : Router) {}

  onChangeValue() {
    console.log(this.keyword); 
  }

  onClickEvent() {
    this.router.navigate(['/Search'], {queryParams: {name: this.keyword}});
    this.keyword = '';
  }
}
