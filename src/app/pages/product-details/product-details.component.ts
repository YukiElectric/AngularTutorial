import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { getImageProduct } from 'src/app/shared/ultils';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  imgUrl : string = '';

  comment: any;
  product: any;

  data: {[key : string] : string} = {
    name: '',
    email: '',
    content: '',
  }

  getComment() {
    this.httpService.getCommentProduct(this.id, {}).subscribe(data => {
      this.comment = data.data.docs
    });
  }

  submitComment(e: any) {
    e.preventDefault();
    this.httpService.createCommentProduct(this.id, this.data, {}).subscribe(data =>{
      if (data.status == 'success') {
        this.getComment();
        for (let key in this.data) this.data[key] = '';
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
      
    })
    
    this.httpService.getProduct(this.id, {}).subscribe(data => {
      this.product = data.data;
      this.imgUrl = getImageProduct(this.product.image);
    });

    this.getComment();
  }
}
