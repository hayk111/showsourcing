import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { FiltersModule } from '../../shared/filters/filters.module';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { MatTableModule } from '@angular/material/table';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductCardViewComponent } from './components/product-card-view/product-card-view.component';

@NgModule({
	imports: [
		CommonModule,
		FiltersModule,
		MatTableModule,
		FilteredListPageModule
	],
	declarations: [ ProductsPageComponent, ProductFiltersComponent,
		ProductListViewComponent, ProductCardViewComponent]
})
export class ProductsPageModule { }
