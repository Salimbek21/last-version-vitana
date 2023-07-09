import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpBaseService } from './http-base.service';
@Injectable({ providedIn: 'root' })
export class CustomersService {
  private http$ = inject(HttpBaseService);
  router = inject(Router);

  getCustomers(): Observable<any> {
    return this.http$.get('api/customers');
  }

  getById(id: number) {
    return this.http$.get(`api/customers/${id}`);
  }

  createCustomers(model: any) {
    return this.http$.post('api/customers/', model);
  }
  updateCustomers(model: any, id: number) {
    return this.http$.put(`api/customers/${id}/`, model);
  }

  delete(id: number) {
    return this.http$.delete(`api/customers/${id}`);
  }
}
