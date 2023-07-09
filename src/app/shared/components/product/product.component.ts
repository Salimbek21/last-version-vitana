import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@services/product.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'dashboard',
  templateUrl: './product.component.html',
  standalone: true,
  styleUrls: ['./product.component.scss'],
  imports: [CommonModule, NgxPaginationModule],
})
export class ProductComponent implements OnInit {
  data: any[] = [];
  p: number = 1;
  collection: any[] = [];
  productService = inject(ProductService);
  router = inject(Router);

  toastService = inject(HotToastService);
  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProducts().subscribe((r: any) => {
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
    this.productService.delete(id).subscribe({
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
