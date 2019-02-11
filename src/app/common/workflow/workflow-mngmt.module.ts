import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '~shared/shared.module';

import { WorkflowManagamentTableComponent } from './workflow-managament-table/workflow-managament-table.component';

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
