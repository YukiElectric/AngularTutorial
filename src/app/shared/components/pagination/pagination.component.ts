import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() pages : any;
  name : string = '';
  urlPath : string = '';
  
  constructor (private route : ActivatedRoute) {}

  renderPagesHtml () {
    let pagesHtml = [];
    let totalPages = Math.ceil(this.pages.total / this.pages.limit);
    for (let i = 1; i <= 10; i++) {
      if(
        i === 1 ||
        i === this.pages.currentPage ||
        i === 10 ||
        // (i >= this.pages.prev && i<= this.pages.next) 
        i <= 3
      ) pagesHtml.push(i);
      else if (
        // i === this.pages.next + 1 ||
        // i === this.pages.prev -1 
        i === 4
      ) pagesHtml.push('...');
    }
    return pagesHtml;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.urlPath = this.route.snapshot.url.map(segment => segment.path).join('/');
  }
}
