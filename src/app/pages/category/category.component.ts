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
  productData : any;
  productItemData : any;

  product : any;
  productItem : any;

  constructor(
    private route : ActivatedRoute,
    private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })

    this.productData = this.httpService.getProductCategory(this.id, {});
    this.productItemData = this.httpService.getCategory(this.id, {});

    this.product = this.productData.data.docs;
    this.productItem = this.productData.data;
  }


}
