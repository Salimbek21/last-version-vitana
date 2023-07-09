import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../src/app/core/guards/auth.guard';
import { LayoutComponent } from '@components/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],


    children: [
      {
        path: 'dashboard',
        data: { breadcrumb: 'dashboard' },
        loadComponent: () =>
          import('../app/shared/components/dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        data: { breadcrumb: 'orders' },

        loadComponent: () =>
          import('../app/shared/components/orders/orders.component').then(
            (mod) => mod.OrdersComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'customers',
        data: { breadcrumb: 'customers' },

        loadComponent: () =>
          import('../app/shared/components/customers/customers.component').then(
            (mod) => mod.CustomersComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'customers/add',

        loadComponent: () =>
          import(
            '../app/shared/components/customers/customers-add-edit/customers-add-edit.component'
          ).then((mod) => mod.CustomersAddEdit),
        canActivate: [AuthGuard],
      },
      {
        path: 'customers/:id',
        loadComponent: () =>
          import(
            '../app/shared/components/customers/customers-add-edit/customers-add-edit.component'
          ).then((mod) => mod.CustomersAddEdit),
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../app/shared/components/product/product.component').then(
            (mod) => mod.ProductComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'products/add',
        loadComponent: () =>
          import(
            '../app/shared/components/product/product-add-edit/product-add-edit.component'
          ).then((mod) => mod.AddEditProduct),
        canActivate: [AuthGuard],
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            '../app/shared/components/product/product-add-edit/product-add-edit.component'
          ).then((mod) => mod.AddEditProduct),
        canActivate: [AuthGuard],
      },
    ],
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('../app/authentication/authentication.module').then(
  //       (th) => th.AuthenticationModule
  //     ),
  // },
  {
    path: 'login1',
    loadComponent: () =>
      import('../app/authentication/login/login.component').then(
        (mod) => mod.AppLoginComponent
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
