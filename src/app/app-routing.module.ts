import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  {path:'home',component:HomeComponent},
  {path:'addproperty' ,component:AddpropertyComponent},
  {path:'payment',component:PaymentComponent},
  {path:'dashboard',component:DashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
