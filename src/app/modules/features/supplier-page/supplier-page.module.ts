import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierPageComponent } from './components/supplier-page/supplier-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';

@NgModule({
	imports: [
		CommonModule,
		FilteredListPageModule,
		FiltersModule
	],
	declarations: [SupplierPageComponent]
})
export class SupplierPageModule { }
