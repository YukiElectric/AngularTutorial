import { Component, Input, OnInit } from '@angular/core';
import { getImageProduct } from '../../ultils';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit{
  @Input() item : any;

  imgName : any;

  constructor () {
    
  }
  ngOnInit(): void {
    this.imgName = getImageProduct(this.item.image);
  }

}
