import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpBaseService } from './http-base.service';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http$ = inject(HttpBaseService);
  router = inject(Router);

  getProducts(): Observable<any> {
    return this.http$.get('api/products');
  }

  getById(id: number) {
    return this.http$.get(`api/products/${id}`);
  }

  createProduct(model: any) {
    return this.http$.post('api/products/', model);
  }
  updateProduct(model: any, id: number) {
    return this.http$.put(`api/products/${id}/`, model);
  }

  delete(id: number) {
    return this.http$.delete(`api/products/${id}`);
  }
}
