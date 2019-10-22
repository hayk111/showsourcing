import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { AttachmentTableComponent } from './attachment-table/attachment-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { RequestElementTableComponent } from './request-element-table/request-element-table.component';
import { RequestSortingMenuComponent } from './request-sorting-menu/request-sorting-menu.component';
import { RequestTableComponent } from './request-table/request-table.component';
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
		AttachmentTableComponent,
		ProductSortingMenuComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		RequestSortingMenuComponent,
		RequestTableComponent,
		RequestElementTableComponent,
		SampleTableComponent,
		SupplierTableComponent,
		TaskTableComponent,
	],
	exports: [
		AttachmentTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		ProductSortingMenuComponent,
		RequestSortingMenuComponent,
		RequestTableComponent,
		RequestElementTableComponent,
		SampleTableComponent,
		SupplierTableComponent,
		TaskTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }
