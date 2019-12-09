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
import { DefaultColumnsComponent } from './default-columns/default-columns.component';
import { ExportTableComponent } from './exports-table/exports-table.component';
import { TeamMembersTableComponent } from './team-members-table/team-members-table.component';
import { InvitationsTableComponent } from './invitations-table/invitations-table.component';
import { ListManagementTableComponent } from './list-management-table/list-management-table.component';
import { WorkflowManagamentTableComponent } from './workflow-managament-table/workflow-managament-table.component';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { TemplateFieldsTableComponent } from './template-fields-table/template-fields-table.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule
	],
	declarations: [
		AttachmentsTableComponent,
		ContactsTableComponent,
		DefaultColumnsComponent,
		ExportTableComponent,
		InvitationsTableComponent,
		ListManagementTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		RequestElementsTableComponent,
		RequestsTableComponent,
		SamplesTableComponent,
		SuppliersTableComponent,
		TasksTableComponent,
		TeamMembersTableComponent,
		WorkflowManagamentTableComponent,
		TemplateFieldsTableComponent,
	],
	exports: [
		AttachmentsTableComponent,
		ContactsTableComponent,
		ExportTableComponent,
		InvitationsTableComponent,
		ListManagementTableComponent,
		ProductsTableComponent,
		ProjectsTableComponent,
		RequestElementsTableComponent,
		RequestsTableComponent,
		SamplesTableComponent,
		SuppliersTableComponent,
		TasksTableComponent,
		TeamMembersTableComponent,
		WorkflowManagamentTableComponent,
		TemplateFieldsTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }
