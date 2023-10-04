import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { getImageProduct } from 'src/app/shared/ultils';
import { Location } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  localStorageData: any;
  data: any;
  sumPrice: number = 0;
  currentPath = this.location.path();

  customerInfor: { [key: string]: string } = {
    name: '',
    phone: '',
    mail: '',
    add: '',
  }

  countCart: number = 0;

  myForm: FormGroup;

  erorStatus: boolean = true;

  constructor(private httpService: HttpService,
    private location: Location,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      add: ['', Validators.required]
    });
  }

  paymentProduct() {
    if (this.myForm.valid) {
      if (this.countCart != 0) {
        localStorage.removeItem('data');
        this.httpService.updateCountCart();
        this.router.navigate(['/Success'], {});
      } else this.dialogService.openConfirmDialog("noInfor");
    } else this.erorStatus = false;
  }

  changeValueForm() {
    this.erorStatus = true;
  }

  getImage(id: any) {
    return getImageProduct(id);
  }

  getDataFormLocalStorage() {
    this.localStorageData = localStorage.getItem('data');
    if (this.localStorageData) this.data = JSON.parse(this.localStorageData);
  }

  deleteCart(item: any) {
    var newData: {}[] = [];
    for (let index of this.data) if (index.id !== item.id) newData.push(index);
    localStorage.removeItem('data');

    var jsonString = JSON.stringify(newData);
    localStorage.setItem('data', jsonString);
    this.httpService.updateCountCart();
    this.ngOnInit();
  }

  updateCart() {
    var jsonString = JSON.stringify(this.data);
    localStorage.removeItem('data');
    localStorage.setItem('data', jsonString);
    this.httpService.updateCountCart();
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.httpService.countCart.subscribe(data => {
      this.countCart = data;
    })
    this.sumPrice = 0;
    this.getDataFormLocalStorage();
    for (let item of this.data) this.sumPrice += item.count * item.price;
  }

  openConfirm(e: Event) {
    e.preventDefault();
    this.dialogService.openConfirmDialog("contact");
  }

}