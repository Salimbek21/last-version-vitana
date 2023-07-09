import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@services/product.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotToastService } from '@ngneat/hot-toast';
import { CustomersService } from '@services/customers.service';

@Component({
  selector: 'dashboard',
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrls: ['./customers.component.scss'],
  imports: [CommonModule, NgxPaginationModule],
})
export class CustomersComponent implements OnInit {
  data: any[] = [];
  p: number = 1;
  collection: any[] = [];
  customersService = inject(CustomersService);
  router = inject(Router);

  toastService = inject(HotToastService);
  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.customersService.getCustomers().subscribe((r: any) => {
      this.data = r.results;
    });
  }
  navigate() {
    this.router.navigate(['customers/add']);
  }

  editForm(id: number) {
    this.router.navigate([`/customers/${id}`]);
  }

  deleteProduct(id: number) {
    this.customersService.delete(id).subscribe({
      next: () => {
        this.toastService.success('Удалено успешно');
        this.getProduct();
      },

      error: () => {
        this.toastService.success('Произошла ошибка');
      },
    });
  }
}
