import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import {
	CategoryService,
	EventService,
	ProductService,
	SupplierService,
	TeamService,
} from '~global-services';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
    SelectionWithFavoriteService
	]
})
export class ListPageModule { }
