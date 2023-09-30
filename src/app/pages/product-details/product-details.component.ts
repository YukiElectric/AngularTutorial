import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { getImageProduct } from 'src/app/shared/ultils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  imgUrl: string = '';
  isInvalid: any;

  comment: any;
  product: any;

  data: { [key: string]: string } = {
    name: '',
    email: '',
    content: '',
  }

  showAlert: boolean = false;

  currentPath = this.location.path();

  myForm: FormGroup;

  localStorageData = [{
    id : '',
    name: '',
    image: '',
    price: 0,
    count : 1
  },
  ]



  getComment() {
    this.httpService.getCommentProduct(this.id, {}).subscribe(data => {
      this.comment = data.data.docs
    });
  }

  submitComment(e: any) {
    e.preventDefault();
    this.isInvalid = this.myForm.get('name')?.invalid && this.myForm.get('name')?.dirty;
    console.log(this.isInvalid);

    this.httpService.createCommentProduct(this.id, this.data, {}).subscribe(data => {
      if (data.status == 'success') {
        this.getComment();
        for (let key in this.data) this.data[key] = '';
      }
    });
  }


  updateCart() {
    this.showAlert = true;
    
    this.localStorageData = [{
      id: this.product._id,
      name: this.product.name,
      image: this.product.image,
      price: Math.ceil(this.product.price/1000)*1000,
      count : 1
    },
    ]

    var dataFromLocalStorage = localStorage.getItem('data');
    if(dataFromLocalStorage) {
      var parsedData :any = JSON.parse(dataFromLocalStorage);
      
      for(let data of parsedData) {
        var result = this.localStorageData.find((item) => item.id === data.id);
        if(result) result.count+=data.count;
        else this.localStorageData.push(data);
      }
      // for(let data of parsedData) this.localStorageData.push(data);
    }

    const stringJson = JSON.stringify(this.localStorageData);
    localStorage.removeItem('data');
    localStorage.setItem('data', stringJson);
    
    this.httpService.updateCountCart();
  }

  showConfirm() {
    var result = confirm('Sản phẩm đã hết hàng mời chọn sản phẩm khác');
  }

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contents: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })

    this.httpService.getProduct(this.id, {}).subscribe(data => {
      this.product = data.data;
      this.imgUrl = getImageProduct(this.product.image);
    });

    this.getComment();
  }
}
