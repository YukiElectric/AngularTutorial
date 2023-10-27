import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  id : any;

  product : any;
  productItem : any;

  countItem : number = 0;

  page : number = 0;

  pages = {
    limit : 12,
  }

  skeleton : boolean = true;

  constructor(
    private route : ActivatedRoute,
    private httpService : HttpService
  ) { }

  private updateData(): void {
    this.httpService.getParmas();

    this.httpService.page.subscribe(data=>{
      this.page = data;
      this.httpService.getProductCategory(this.id, {
        limit : 12,
        page : this.page
      }).subscribe(data => {   
        this.productItem = data.data.docs;
        this.pages = {...this.pages, ...data.data.pages}
        this.countItem = 0;
        for (let i of this.productItem) if(i!=undefined) this.countItem++;
        this.skeleton = false;
      });
    },)

    this.httpService.getCategory(this.id, {}).subscribe(data => {
      this.product = data.data;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.updateData();
    })
  }


}
