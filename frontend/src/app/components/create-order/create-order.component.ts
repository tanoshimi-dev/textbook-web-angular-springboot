import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuItem } from "../../models/menu-item.model";
import { Order, OrderItem, OrderType } from "../../models/order.model";
import { MenuItemService } from "../../services/menu-item.service";
import { OrderService } from "../../services/order.service";

@Component({
  selector: "app-create-order",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Create New Order</h2>

      <div class="order-form">
        <div class="card">
          <h3>Customer Information</h3>
          <div class="form-group">
            <label>Customer Name *</label>
            <input type="text" [(ngModel)]="order.customerName" required />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" [(ngModel)]="order.customerPhone" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="order.customerEmail" />
          </div>
          <div class="form-group">
            <label>Order Type *</label>
            <select [(ngModel)]="order.orderType" required>
              <option value="DINE_IN">Dine In</option>
              <option value="TAKEAWAY">Takeaway</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>
          <div class="form-group" *ngIf="order.orderType === 'DINE_IN'">
            <label>Table Number</label>
            <input type="text" [(ngModel)]="order.tableNumber" />
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea [(ngModel)]="order.notes" rows="3"></textarea>
          </div>
        </div>

        <div class="card">
          <h3>Select Items</h3>
          <div class="menu-selection">
            <div *ngFor="let item of menuItems" class="menu-item-row">
              <div class="item-info">
                <strong>{{ item.name }}</strong>
                <span class="item-price">\${{ item.price }}</span>
              </div>
              <div class="item-actions">
                <button class="btn btn-sm" (click)="decreaseQuantity(item.id!)">
                  -
                </button>
                <span class="quantity">{{ getQuantity(item.id!) }}</span>
                <button class="btn btn-sm" (click)="increaseQuantity(item.id!)">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card" *ngIf="order.items.length > 0">
          <h3>Order Summary</h3>
          <div class="order-summary">
            <div *ngFor="let item of order.items" class="summary-item">
              <span
                >{{ item.quantity }}x
                {{ getMenuItemName(item.menuItemId) }}</span
              >
              <span>\${{ calculateItemTotal(item) }}</span>
            </div>
            <div class="summary-total">
              <strong>Total:</strong>
              <strong>\${{ calculateTotal() }}</strong>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button
            class="btn btn-success"
            (click)="submitOrder()"
            [disabled]="!isValidOrder()"
          >
            Place Order
          </button>
          <button class="btn" (click)="resetForm()">Reset</button>
        </div>

        <div
          *ngIf="!isValidOrder()"
          style="color: red; margin-top: 10px; font-size: 14px;"
        >
          <p *ngIf="order.customerName.trim() === ''">
            ⚠️ Please enter customer name
          </p>
          <p *ngIf="order.items.length === 0">
            ⚠️ Please add at least one item to the order
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .order-form {
        max-width: 800px;
        margin: 0 auto;
      }

      .menu-selection {
        max-height: 400px;
        overflow-y: auto;
      }

      .menu-item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }

      .item-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .item-price {
        color: #28a745;
        font-size: 14px;
      }

      .item-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .item-actions .btn {
        width: 30px;
        height: 30px;
        padding: 0;
        background-color: #007bff;
        color: white;
      }

      .quantity {
        min-width: 30px;
        text-align: center;
        font-weight: bold;
      }

      .order-summary {
        padding: 10px 0;
      }

      .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        padding: 15px 0 10px;
        font-size: 18px;
        border-top: 2px solid #333;
        margin-top: 10px;
      }

      .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }

      .form-actions button {
        flex: 1;
      }
    `,
  ],
})
export class CreateOrderComponent implements OnInit {
  menuItems: MenuItem[] = [];
  order: Order = {
    customerName: "",
    orderType: OrderType.DINE_IN,
    items: [],
  };
  itemQuantities: Map<number, number> = new Map();

  constructor(
    private menuItemService: MenuItemService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItemService.getAvailableMenuItems().subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (error) => {
        console.error("Error loading menu items:", error);
      },
    });
  }

  getQuantity(itemId: number): number {
    return this.itemQuantities.get(itemId) || 0;
  }

  increaseQuantity(itemId: number): void {
    const currentQty = this.getQuantity(itemId);
    this.itemQuantities.set(itemId, currentQty + 1);
    this.updateOrderItems();
  }

  decreaseQuantity(itemId: number): void {
    const currentQty = this.getQuantity(itemId);
    if (currentQty > 0) {
      this.itemQuantities.set(itemId, currentQty - 1);
      this.updateOrderItems();
    }
  }

  updateOrderItems(): void {
    this.order.items = [];
    this.itemQuantities.forEach((quantity, itemId) => {
      if (quantity > 0) {
        this.order.items.push({
          menuItemId: itemId,
          quantity: quantity,
        });
      }
    });
  }

  getMenuItemName(itemId: number): string {
    const item = this.menuItems.find((i) => i.id === itemId);
    return item ? item.name : "";
  }

  calculateItemTotal(orderItem: OrderItem): number {
    const menuItem = this.menuItems.find((i) => i.id === orderItem.menuItemId);
    return menuItem ? menuItem.price * orderItem.quantity : 0;
  }

  calculateTotal(): number {
    return this.order.items.reduce(
      (total, item) => total + this.calculateItemTotal(item),
      0,
    );
  }

  isValidOrder(): boolean {
    return this.order.customerName.trim() !== "" && this.order.items.length > 0;
  }

  submitOrder(): void {
    if (!this.isValidOrder()) {
      alert("Please fill in customer name and add at least one item.");
      return;
    }

    this.orderService.createOrder(this.order).subscribe({
      next: (response) => {
        alert("Order created successfully!");
        this.router.navigate(["/orders"]);
      },
      error: (error) => {
        console.error("Error creating order:", error);
        alert("Failed to create order. Please try again.");
      },
    });
  }

  resetForm(): void {
    this.order = {
      customerName: "",
      orderType: OrderType.DINE_IN,
      items: [],
    };
    this.itemQuantities.clear();
  }
}
