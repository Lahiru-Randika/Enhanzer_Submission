import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PurchaseRow {
  item: string;
  batch: string;
  cost: number;
  price: number;
  qty: number;
  discount: number;
  totalCost: number;
  totalSelling: number;
}

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  items = ['Mango', 'Apple', 'Banana', 'Orange', 'Grapes', 'Kiwi', 'Strawberry'];
  locations: any[] = [];

  selectedItem = '';
  batch = '';
  cost: number | null = null;
  price: number | null = null;
  qty: number | null = null;
  discount: number | null = 0;
  freeQty: number | null = 0;

  table: PurchaseRow[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getLocations().subscribe({
      next: (res: any) => {
        this.locations = res;
      },
      error: () => {
        this.locations = [];
      }
    });
  }

  add(): void {
    const cost = Number(this.cost ?? 0);
    const price = Number(this.price ?? 0);
    const qty = Number(this.qty ?? 0);
    const discount = Number(this.discount ?? 0);

    if (!this.selectedItem || !this.batch || cost <= 0 || price <= 0 || qty <= 0) {
      alert('Please fill all required fields correctly.');
      return;
    }

    // Assignment-style calculation:
    // Total Cost = (Standard Cost × Quantity) - Discount%
    const grossCost = cost * qty;
    const totalCost = grossCost - (grossCost * discount / 100);

    // Total Selling = Standard Price × Quantity
    const totalSelling = price * qty;

    this.table.push({
      item: this.selectedItem,
      batch: this.batch,
      cost,
      price,
      qty,
      discount,
      totalCost,
      totalSelling
    });

    this.resetForm();
  }

  resetForm(): void {
    this.selectedItem = '';
    this.batch = '';
    this.cost = null;
    this.price = null;
    this.qty = null;
    this.discount = 0;
    this.freeQty = 0;
  }

  get totalItems(): number {
    return this.table.length;
  }

  get totalQty(): number {
    return this.table.reduce((sum, row) => sum + row.qty, 0);
  }

  get totalCost(): number {
    return this.table.reduce((sum, row) => sum + row.totalCost, 0);
  }

  get totalSelling(): number {
    return this.table.reduce((sum, row) => sum + row.totalSelling, 0);
  }

  get netTotal(): number {
    return this.totalSelling;
  }
}