import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	CategoryService,
	EventService,
	ProductService,
	SupplierService,
	TeamService,
	UserApolloService,
} from '~global-services';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [CategoryService, UserApolloService, TeamService, SupplierService, EventService, ProductService]
})
export class ListPageModule { }
