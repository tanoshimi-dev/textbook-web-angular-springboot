import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderStatus } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Orders</h2>

      <div class="filter-buttons">
        <button class="btn btn-primary" (click)="filterByStatus('all')"
                [class.active]="selectedStatus === 'all'">All</button>
        <button class="btn btn-primary" (click)="filterByStatus('PENDING')"
                [class.active]="selectedStatus === 'PENDING'">Pending</button>
        <button class="btn btn-primary" (click)="filterByStatus('CONFIRMED')"
                [class.active]="selectedStatus === 'CONFIRMED'">Confirmed</button>
        <button class="btn btn-primary" (click)="filterByStatus('PREPARING')"
                [class.active]="selectedStatus === 'PREPARING'">Preparing</button>
        <button class="btn btn-primary" (click)="filterByStatus('READY')"
                [class.active]="selectedStatus === 'READY'">Ready</button>
        <button class="btn btn-primary" (click)="filterByStatus('COMPLETED')"
                [class.active]="selectedStatus === 'COMPLETED'">Completed</button>
      </div>

      <div class="orders-grid">
        <div *ngFor="let order of filteredOrders" class="order-card">
          <div class="order-header">
            <h3>Order #{{ order.id }}</h3>
            <span [class]="'status-badge status-' + order.status?.toLowerCase()">
              {{ order.status }}
            </span>
          </div>

          <div class="order-details">
            <p><strong>Customer:</strong> {{ order.customerName }}</p>
            <p *ngIf="order.customerPhone"><strong>Phone:</strong> {{ order.customerPhone }}</p>
            <p><strong>Type:</strong> {{ order.orderType }}</p>
            <p *ngIf="order.tableNumber"><strong>Table:</strong> {{ order.tableNumber }}</p>
          </div>

          <div class="order-items">
            <h4>Items:</h4>
            <ul>
              <li *ngFor="let item of order.items">
                {{ item.quantity }}x {{ item.menuItemName }} - \${{ item.subtotal }}
                <span *ngIf="item.specialInstructions" class="special-note">
                  ({{ item.specialInstructions }})
                </span>
              </li>
            </ul>
          </div>

          <div class="order-footer">
            <div class="total">
              <strong>Total: \${{ order.totalAmount }}</strong>
            </div>
            <div class="actions">
              <button *ngIf="order.status === 'PENDING'"
                      class="btn btn-success btn-sm"
                      (click)="updateStatus(order.id!, 'CONFIRMED')">
                Confirm
              </button>
              <button *ngIf="order.status === 'CONFIRMED'"
                      class="btn btn-success btn-sm"
                      (click)="updateStatus(order.id!, 'PREPARING')">
                Start Preparing
              </button>
              <button *ngIf="order.status === 'PREPARING'"
                      class="btn btn-success btn-sm"
                      (click)="updateStatus(order.id!, 'READY')">
                Mark Ready
              </button>
              <button *ngIf="order.status === 'READY'"
                      class="btn btn-success btn-sm"
                      (click)="updateStatus(order.id!, 'COMPLETED')">
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="filteredOrders.length === 0" class="no-items">
        <p>No orders found.</p>
      </div>
    </div>
  `,
  styles: [`
    .filter-buttons {
      margin: 20px 0;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .filter-buttons .btn.active {
      background-color: #0056b3;
    }

    .orders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .order-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
    }

    .order-header h3 {
      margin: 0;
    }

    .order-details {
      margin-bottom: 15px;
    }

    .order-details p {
      margin: 5px 0;
      color: #666;
    }

    .order-items {
      margin-bottom: 15px;
    }

    .order-items h4 {
      margin-bottom: 10px;
      font-size: 16px;
    }

    .order-items ul {
      list-style: none;
      padding: 0;
    }

    .order-items li {
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .special-note {
      font-size: 12px;
      color: #666;
      font-style: italic;
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 2px solid #f0f0f0;
    }

    .total {
      font-size: 18px;
      color: #28a745;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 12px;
    }

    .no-items {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    if (status === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === status);
    }
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status as OrderStatus).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error updating order status:', error);
      }
    });
  }
}
