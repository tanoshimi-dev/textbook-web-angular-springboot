import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';
import { MenuItemService } from '../../services/menu-item.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Menu Items</h2>

      <div class="filter-buttons">
        <button class="btn btn-primary" (click)="filterByCategory('all')"
                [class.active]="selectedCategory === 'all'">All</button>
        <button class="btn btn-primary" (click)="filterByCategory('Coffee')"
                [class.active]="selectedCategory === 'Coffee'">Coffee</button>
        <button class="btn btn-primary" (click)="filterByCategory('Pastry')"
                [class.active]="selectedCategory === 'Pastry'">Pastry</button>
        <button class="btn btn-primary" (click)="filterByCategory('Sandwich')"
                [class.active]="selectedCategory === 'Sandwich'">Sandwich</button>
        <button class="btn btn-primary" (click)="filterByCategory('Salad')"
                [class.active]="selectedCategory === 'Salad'">Salad</button>
      </div>

      <div class="grid">
        <div *ngFor="let item of filteredMenuItems" class="menu-card">
          <div class="menu-card-header">
            <h3>{{ item.name }}</h3>
            <span class="price">\${{ item.price }}</span>
          </div>
          <p class="description">{{ item.description }}</p>
          <div class="menu-card-footer">
            <span class="category">{{ item.category }}</span>
            <span class="availability" [class.unavailable]="!item.available">
              {{ item.available ? 'Available' : 'Unavailable' }}
            </span>
          </div>
          <div *ngIf="item.preparationTime" class="prep-time">
            <small>⏱️ {{ item.preparationTime }} min</small>
          </div>
        </div>
      </div>

      <div *ngIf="filteredMenuItems.length === 0" class="no-items">
        <p>No menu items found.</p>
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

    .menu-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .menu-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .menu-card-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 10px;
    }

    .menu-card-header h3 {
      margin: 0;
      font-size: 18px;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
      color: #28a745;
    }

    .description {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .menu-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .category {
      background-color: #007bff;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .availability {
      color: #28a745;
      font-weight: 600;
      font-size: 14px;
    }

    .availability.unavailable {
      color: #dc3545;
    }

    .prep-time {
      margin-top: 10px;
      color: #666;
    }

    .no-items {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class MenuListComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  selectedCategory: string = 'all';

  constructor(private menuItemService: MenuItemService) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItemService.getAvailableMenuItems().subscribe({
      next: (data) => {
        this.menuItems = data;
        this.filteredMenuItems = data;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredMenuItems = this.menuItems;
    } else {
      this.filteredMenuItems = this.menuItems.filter(item => item.category === category);
    }
  }
}
