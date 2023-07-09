import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '@services/customers.service';

@Component({
  selector: 'app-edit-add-product',
  templateUrl: './customers-add-edit.component.html',
  styleUrls: ['./customers-add-edit.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class CustomersAddEdit implements OnInit {
  constructor() {}

  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  customersService = inject(CustomersService);
  toastService = inject(HotToastService);
  submitForm: any;
  ngOnInit() {
    this.submitForm = this.fb.group({
      id: '',
      full_name: this.fb.control(''),
      code: this.fb.control(''),
      phone_number: this.fb.control('998'),
      secondary_phone_number: this.fb.control('998'),
    });

    if (this.route.snapshot.params.id) {
      this.customersService.getById(this.route.snapshot.params.id).subscribe({
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
    const id = this.route.snapshot.params.id;
    if (this.route.snapshot.params.id) {
      this.customersService.updateCustomers(formValue, id).subscribe({
        next: () => {
          this.toastService.success('Продукт успешно обновлен');
          this.router.navigate(['/customers']);
        },
        error: () => {
          this.toastService.error('Произошла ошибка');
        },
      });
    } else {
      this.customersService.createCustomers(formValue).subscribe({
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
