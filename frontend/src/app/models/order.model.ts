export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY',
  DELIVERY = 'DELIVERY'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface OrderItem {
  id?: number;
  menuItemId: number;
  menuItemName?: string;
  quantity: number;
  price?: number;
  specialInstructions?: string;
  subtotal?: number;
}

export interface Order {
  id?: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  tableNumber?: string;
  orderType: OrderType;
  status?: OrderStatus;
  items: OrderItem[];
  totalAmount?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
