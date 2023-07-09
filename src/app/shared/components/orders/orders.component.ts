import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@services/product.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotToastService } from '@ngneat/hot-toast';
import { OrderService } from '@services/order.service';

@Component({
  selector: 'dashboard',
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrls: ['./orders.component.scss'],
  imports: [CommonModule, NgxPaginationModule],
})
export class OrdersComponent implements OnInit {
  data: any[] = [];
  p: number = 1;
  collection: any[] = [];
  orderService = inject(OrderService);
  router = inject(Router);

  toastService = inject(HotToastService);
  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.orderService.getOrder().subscribe((r: any) => {
      this.data = r.results;
    });
  }
  navigate() {
    this.router.navigate(['products/add']);
  }

  editForm(id: number) {
    this.router.navigate([`/products/${id}`]);
  }

  deleteProduct(id: number) {
    this.orderService.delete(id).subscribe({
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
