import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductSortingMenuComponent } from '~common/sorting-menus/product-sorting-menu/product-sorting-menu.component';
import { SharedModule } from '~shared/shared.module';

import { AttachmentsTableComponent } from './attachments-table/attachments-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { RequestElementsTableComponent } from './request-elements-table/request-elements-table.component';
import { RequestsTableComponent } from './requests-table/requests-table.component';
import { SamplesTableComponent } from './samples-table/samples-table.component';
import { SuppliersTableComponent } from './suppliers-table/suppliers-table.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule
	],
	declarations: [
		AttachmentsTableComponent,
		ProductSortingMenuComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		RequestsTableComponent,
		RequestElementsTableComponent,
		SamplesTableComponent,
		SuppliersTableComponent,
		TasksTableComponent,
	],
	exports: [
		AttachmentsTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		ProductSortingMenuComponent,
		RequestsTableComponent,
		RequestElementsTableComponent,
		SamplesTableComponent,
		SuppliersTableComponent,
		TasksTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }
