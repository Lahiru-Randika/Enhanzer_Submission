import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ ADD THIS

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ ADD HERE
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
  discount = 0;

  table:any[] = [];

  constructor(private api: ApiService){}

  ngOnInit(){
    this.api.getLocations().subscribe((res:any)=> this.locations = res);
  }

  add(){
    const totalCost = (this.cost * this.qty) - (this.cost * this.qty * this.discount/100);
    const totalSelling = this.price * this.qty;

    this.table.push({
      item:this.selectedItem,
      batch:this.batch,
      qty:this.qty,
      totalCost,
      totalSelling
    });
  }

  get totalItems(){
    return this.table.length;
  }

  get totalQty(){
    return this.table.reduce((a,b)=>a+b.qty,0);
  }
}