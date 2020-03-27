import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ProductSortingMenuComponent } from './product-sorting-menu/product-sorting-menu.component';
import { RequestSortingMenuComponent } from './request-sorting-menu/request-sorting-menu.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		ProductSortingMenuComponent,
		RequestSortingMenuComponent
	],
	exports: [
		ProductSortingMenuComponent,
		RequestSortingMenuComponent
	]
})
export class SortingMenusCommonModule { }
