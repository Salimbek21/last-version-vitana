import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpBaseService } from './http-base.service';
@Injectable({ providedIn: 'root' })

export class OrderService {
  private http$ = inject(HttpBaseService);
  router = inject(Router);

  getOrder(): Observable<any> {
    return this.http$.get('api/orders');
  }

  getById(id: number) {
    return this.http$.get(`api/orders/${id}`);
  }

  createOrder(model: any) {
    return this.http$.post('api/orders/', model);
  }
  updateOrder(model: any, id: number) {
    return this.http$.put(`api/orders/${id}/`, model);
  }

  delete(id: number) {
    return this.http$.delete(`api/orders/${id}`);
  }
}
