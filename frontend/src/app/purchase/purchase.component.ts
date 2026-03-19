import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  items = ["Mango","Apple","Banana","Orange","Grapes","Kiwi","Strawberry"];
  locations:any[] = [];

  selectedItem = '';
  batch = '';
  cost = 0;
  price = 0;
  qty = 0;
  discount = 0; // %

  table:any[] = [];

  constructor(private api: ApiService){}

  ngOnInit(){
    this.api.getLocations().subscribe((res:any)=> this.locations = res);
  }

  add(){

    const totalCost = this.cost * this.qty;

    const grossSelling = this.price * this.qty;

    const discountAmount = grossSelling * (this.discount / 100);

    const totalSelling = grossSelling - discountAmount;

    this.table.push({
      item: this.selectedItem,
      batch: this.batch,
      cost: this.cost,
      price: this.price,
      qty: this.qty,
      discount: this.discount,
      totalCost: totalCost,
      totalSelling: totalSelling
    });

    // reset inputs (optional clean UX)
    this.selectedItem = '';
    this.batch = '';
    this.cost = 0;
    this.price = 0;
    this.qty = 0;
    this.discount = 0;
  }

  // ✅ SUMMARY

  get totalItems(){
    return this.table.length;
  }

  get totalQty(){
    return this.table.reduce((sum, item) => sum + item.qty, 0);
  }

  get totalCost(){
    return this.table.reduce((sum, item) => sum + item.totalCost, 0);
  }

  get totalSelling(){
    return this.table.reduce((sum, item) => sum + item.totalSelling, 0);
  }

  get netTotal(){
    return this.totalSelling;
  }
}