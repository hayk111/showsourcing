import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { AttachmentsTableComponent } from './attachments-table/attachments-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { RequestElementsTableComponent } from './request-elements-table/request-elements-table.component';
import { RequestsTableComponent } from './requests-table/requests-table.component';
import { SamplesTableComponent } from './samples-table/samples-table.component';
import { SuppliersTableComponent } from './suppliers-table/suppliers-table.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TemplateFieldsTableComponent } from './template-fields-table/template-fields-table.component';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule
	],
	declarations: [
		AttachmentsTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		RequestsTableComponent,
		RequestElementsTableComponent,
		SamplesTableComponent,
		SuppliersTableComponent,
		TasksTableComponent,
		TemplateFieldsTableComponent,
	],
	exports: [
		AttachmentsTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		RequestsTableComponent,
		RequestElementsTableComponent,
		SamplesTableComponent,
		SuppliersTableComponent,
		TasksTableComponent,
		TemplateFieldsTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }
