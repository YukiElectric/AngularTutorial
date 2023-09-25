import { Component, Input } from '@angular/core';
import { getImageProduct } from '../../ultils';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent {
  @Input() item : any;

  imgName : any;

  constructor () {
    this.imgName = getImageProduct(this.item.id);
  }
}
