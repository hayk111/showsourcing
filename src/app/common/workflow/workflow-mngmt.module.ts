import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { WorkflowManagamentTableComponent } from './workflow-managament-table/workflow-managament-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		WorkflowManagamentTableComponent
	],
	imports: [
		SharedModule,
		FormsModule
	],
	exports: [WorkflowManagamentTableComponent]
})
export class WorkflowMngmtCommonModule { }
