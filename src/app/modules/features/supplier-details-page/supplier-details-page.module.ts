import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import { SupplierActivityComponent } from './components/supplier-activity/supplier-activity.component';
import { EntityMainCardModule } from '../../shared/entity-main-card/entity-main-card.module';

@NgModule({
  imports: [
		CommonModule,
		EntityMainCardModule
  ],
  declarations: [SupplierDetailsComponent, SupplierActivityComponent]
})
export class SupplierDetailsPageModule { }
