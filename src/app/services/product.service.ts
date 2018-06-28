import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:3000/products";
  constructor(private httpClient: HttpClient) { }

  getAllProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }
  
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);
  }

  editProduct(product: Product) : Observable<Product> {
    return this.httpClient.put<Product>(this.url+'/'+product.id, product);
  }

  deleteProduct(id: number) : Observable<Product> {
    return this.httpClient.delete<Product>(this.url+'/' + id);
  }
}
