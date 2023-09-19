import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public keyword : string = '';

  constructor(private router : Router) {}

  onChangeValue(e : any) {
    this.keyword = e.target.value;
  }

  onClickEvent() {
    this.router.navigate(['/Search'], {queryParams: {name: this.keyword}});
    this.keyword = '';
  }
}
