import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { AttachmentsTableComponent } from './attachments-table/attachments-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { RequestElementsTableComponent } from './request-elements-table/request-elements-table.component';
import { RequestSortingMenuComponent } from './request-sorting-menu/request-sorting-menu.component';
import { RequestsTableComponent } from './requests-table/requests-table.component';
import { SampleTableComponent } from './sample-table/sample-table.component';
import { SupplierTableComponent } from './supplier-table/supplier-table.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { ProductSortingMenuComponent } from './product-sorting-menu/product-sorting-menu.component';


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
		RequestSortingMenuComponent,
		RequestsTableComponent,
		RequestElementsTableComponent,
		SampleTableComponent,
		SupplierTableComponent,
		TaskTableComponent,
	],
	exports: [
		AttachmentsTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		ProductSortingMenuComponent,
		RequestSortingMenuComponent,
		RequestsTableComponent,
		RequestElementsTableComponent,
		SampleTableComponent,
		SupplierTableComponent,
		TaskTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }
