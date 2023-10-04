import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { getImageProduct } from 'src/app/shared/ultils';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit{
  saleProducts : any;
  comboSaleProducts : any;

  constructor (private httpService : HttpService) {}

  getImage (imgName : any){
    return getImageProduct(imgName);
  }

  ngOnInit(): void {
    this.httpService.getProducts({
      limit : 6,
      name : 'iphone',
      "filter[is_featured]" : true,
      "filter[is_stock]" : true
    }).subscribe(data => {
      this.saleProducts = data.data.docs;
    })

    this.httpService.getProducts({
      limit : 6,
      "filter[is_featured]" : true,
      "filter[is_stock]" : true,
      page: 168
    }).subscribe(data => {
      this.comboSaleProducts = data.data.docs;
    })
  }
}
