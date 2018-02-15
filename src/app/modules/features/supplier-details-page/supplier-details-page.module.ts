import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import { SupplierActivityComponent } from './components/supplier-activity/supplier-activity.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SupplierDetailsComponent, SupplierActivityComponent]
})
export class SupplierDetailsPageModule { }
