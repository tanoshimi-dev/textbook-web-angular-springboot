import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadComponent: () => import('./components/menu-list/menu-list.component').then(m => m.MenuListComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent)
  },
  {
    path: 'create-order',
    loadComponent: () => import('./components/create-order/create-order.component').then(m => m.CreateOrderComponent)
  }
];
