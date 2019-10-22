import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { RequestElementTableComponent } from './request-element-table/request-element-table.component';
import { RequestSortingMenuComponent } from './request-sorting-menu/request-sorting-menu.component';
import { SampleTableComponent } from './sample-table/sample-table.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { SupplierTableComponent } from './supplier-table/supplier-table.component';
import { AttachmentTableComponent } from './attachment-table/attachment-table.component';
import { RequestTableComponent } from './request-table/request-table.component';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule
	],
	declarations: [
		AttachmentTableComponent,
		ProjectsTableComponent,
		RequestTableComponent,
		RequestSortingMenuComponent,
		RequestElementTableComponent,
		SampleTableComponent,
		SupplierTableComponent,
		TaskTableComponent,
	],
	exports: [
		AttachmentTableComponent,
		ProjectsTableComponent,
		RequestTableComponent,
		RequestSortingMenuComponent,
		RequestElementTableComponent,
		SampleTableComponent,
		SupplierTableComponent,
		TaskTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }
