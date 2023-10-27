import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { BASE_API } from '../shared/constants/app';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  countCart : BehaviorSubject<number> = new BehaviorSubject(0);
  page : BehaviorSubject<number> = new BehaviorSubject(0);
  keyword : BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private Http: HttpClient,
    private route: ActivatedRoute
  ) { }

  private converConfigToParams(config: any): HttpParams {
    let queryParams = new HttpParams();
    for (let key of Object.keys(config)) {
      queryParams = queryParams.set(key, config[key]);
    }
    return queryParams;
  }

  private configParams(config : any) {
    let params = { params: config ? this.converConfigToParams(config) : undefined }
    return params;
  }

  getProducts(config: any): Observable<any> {
    return this.Http.get(BASE_API+'/products', this.configParams(config));
  }

  getCategories(config: any): Observable<any> {
    return this.Http.get(BASE_API + '/categories', this.configParams(config));
  }

  getCategory(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/categories/' + id, this.configParams(config));
  }

  getProductCategory(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/categories/' + id + '/products', this.configParams(config));
  }

  getProduct(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/products/' + id, this.configParams(config));
  }

  getCommentProduct(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/products/' + id + '/comments', this.configParams(config));
  }

  createCommentProduct(id: any, data: any, config: any): Observable<any> {
    return this.Http.post(BASE_API + '/products/' + id + '/comments', data, this.configParams(config));
  }

  sendOrder(data : any, config: any): Observable<any> {
    return this.Http.post(BASE_API+'/order', data, this.configParams(config));
  }

  updateCountCart() : void {
    const dataFromLocalStorage = localStorage.getItem('data');
    var tempCount = 0;
    if(dataFromLocalStorage) {
      var parsedData = JSON.parse(dataFromLocalStorage);
      for(let data of parsedData) if (data!=undefined) tempCount+=data.count;
    }
    this.countCart.next(tempCount);
  }

  getParmas() : void {
    this.route.queryParams.subscribe(params => {
      this.keyword.next(params['name']);
      this.page.next(params['page']); 
    })
  }

}
