import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../shared/constants/app';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private Http: HttpClient,
  ) { }

  private converConfigToParams(config: any): HttpParams {
    let queryParams = new HttpParams();
    for (let key of Object.keys(config)) {
      queryParams = queryParams.set(key, config[key]);
    }
    return queryParams;
  }

  getProducts(config: any): Observable<any> {
    return this.Http.get(BASE_API+'/products', { params: config ? this.converConfigToParams(config) : undefined });
  }

  getCategories(config: any): Observable<any> {
    return this.Http.get(BASE_API + '/categories', { params: config ? this.converConfigToParams(config) : undefined });
  }

  getCategory(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/categories/' + id, { params: config ? this.converConfigToParams(config) : undefined });
  }

  getProductCategory(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/categories/' + id + '/products', { params: config ? this.converConfigToParams(config) : undefined });
  }

  getProduct(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/products/' + id, { params: config ? this.converConfigToParams(config) : undefined });
  }

  getCommentProduct(id: any, config: any): Observable<any> {
    return this.Http.get(BASE_API + '/products/' + id + '/comments', { params: config ? this.converConfigToParams(config) : undefined });
  }

  createCommentProduct(id: any, data: any, config: any): Observable<any> {
    return this.Http.post(BASE_API + '/products/' + id + '/comments', data, { params: config ? this.converConfigToParams(config) : undefined });
  }
}
