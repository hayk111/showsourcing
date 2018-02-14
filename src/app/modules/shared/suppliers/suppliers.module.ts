import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierStatusIconComponent } from './components/supplier-status-icon/supplier-status-icon.component';
import { IconsModule } from '../icons/icons.module';
import { AppStoreModule } from '../../store/store.module';

@NgModule({
  imports: [
		CommonModule,
		IconsModule,
		AppStoreModule.forRoot(),
  ],
	declarations: [ SupplierStatusIconComponent ],
	exports: [ SupplierStatusIconComponent ]
})
export class SuppliersModule { }
