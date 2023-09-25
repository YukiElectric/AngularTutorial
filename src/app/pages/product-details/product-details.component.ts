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

  commentData: any;
  comment: any;
  productData: any;
  product: any;

  data: {[key : string] : string} = {
    name: '',
    email: '',
    content: '',
  }

  dataStatus: any;

  getComment() {
    this.commentData = this.httpService.getCommentProduct(this.id, {});
  }

  submitComment(e: any) {
    e.preventDefault();
    this.dataStatus = this.httpService.createCommentProduct(this.id, this.data, {});
    if (this.dataStatus.status == 'success') {
      this.getComment();
      for (let key in this.data) this.data[key] = '';
    }
  }

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.getComment();
    this.productData = this.httpService.getProduct(this.id, {});

    this.imgUrl = getImageProduct(this.id);
    this.product = this.productData.data.docs;
  }
}
