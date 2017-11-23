import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierPageComponent } from './components/supplier-page/supplier-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';
import { SupplierListViewComponent } from './components/supplier-list-view/supplier-list-view.component';

@NgModule({
	imports: [
		CommonModule,
		FilteredListPageModule,
		FiltersModule
	],
	declarations: [SupplierPageComponent, SupplierListViewComponent]
})
export class SupplierPageModule { }
