import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierStatusIconComponent } from './components/supplier-status-icon/supplier-status-icon.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  imports: [
		CommonModule,
		IconsModule
  ],
	declarations: [ SupplierStatusIconComponent ],
	exports: [ SupplierStatusIconComponent ]
})
export class SuppliersModule { }
