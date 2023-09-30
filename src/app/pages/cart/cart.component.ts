import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { getImageProduct } from 'src/app/shared/ultils';
import { Location } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';

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
  status = false;

  constructor(private httpService: HttpService,
    private location: Location,
    private dialogService : DialogService
  ) { }

  paymentProduct() {
    localStorage.removeItem('data');
    this.httpService.updateCountCart();
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
    this.sumPrice = 0;
    this.getDataFormLocalStorage();
    for (let item of this.data) this.sumPrice += item.count * item.price;
  }

  openConfirm (e : Event) {
    e.preventDefault();
    this.status = true;
    this.dialogService.openConfirmDialog();
  }

}
