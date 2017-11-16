import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { FiltersModule } from '../../shared/filters/filters.module';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable/src';
import { MatTableModule } from '@angular/material/table';
@NgModule({
	imports: [
		CommonModule,
		FiltersModule,
		// NgxDatatableModule
		MatTableModule
	],
	declarations: [ProductsPageComponent, ProductFiltersComponent]
})
export class ProductsPageModule { }
