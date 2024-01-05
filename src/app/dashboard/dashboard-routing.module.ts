import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as dashboardPages from "./index"

const routes: Routes = [
  {
    path: '',
    component: dashboardPages.NavbarComponent,
    children: []
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
