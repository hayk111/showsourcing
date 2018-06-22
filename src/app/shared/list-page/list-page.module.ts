import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, UserService, TeamService, SupplierService } from '~global-services';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [CategoryService, UserService, TeamService, SupplierService]
})
export class ListPageModule { }
