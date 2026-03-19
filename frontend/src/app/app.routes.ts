import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PurchaseComponent } from './purchase/purchase.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'purchase', component: PurchaseComponent }
];