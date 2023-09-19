import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'new-pj';
  public count : number = 0;
  public name: string = '';

  constructor() {
    this.count = 8;
  }

  public IncrementCount () : void {
    this.count++;
  }
}
