import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	CategoryService,
	EventService,
	ProductService,
	SupplierService,
	TeamService,
	UserService,
} from '~global-services';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [CategoryService, UserService, TeamService, SupplierService, EventService, ProductService]
})
export class ListPageModule { }
