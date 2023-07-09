import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-add-product',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class AddEditProduct implements OnInit {
  constructor() {}

  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  toastService = inject(HotToastService);
  submitForm: any;
  ngOnInit() {
    this.submitForm = this.fb.group({
      id: '',
      name: this.fb.control(''),
      price: this.fb.control(''),
    });

    if (this.route.snapshot.params.id) {
      this.productService.getById(this.route.snapshot.params.id).subscribe({
        next: (r: any) => {
          this.submitForm.patchValue(r);
        },
        error: () => {},
      });
    }
  }

  get formControl() {
    return this.submitForm.controls;
  }

  sendForm() {
    const formValue = this.submitForm.value;
    const id = this.route.snapshot.params.id
    console.log(formValue, 'value');
    if(this.route.snapshot.params.id){
      this.productService.updateProduct(formValue,id).subscribe({
        next: () => {
          this.toastService.success('Продукт успешно обновлен');
          this.router.navigate(['/products']);
        },
        error: () => {
          this.toastService.error('Произошла ошибка');
        },
      });
    }else{
      this.productService.createProduct(formValue).subscribe({
        next: () => {
          this.toastService.success('Продукт успешно добавлен');
          this.router.navigate(['/products']);
        },
        error: () => {
          this.toastService.error('Произошла ошибка');
        },
      });
    }

  }
}
