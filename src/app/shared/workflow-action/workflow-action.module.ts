import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { WorkflowActionComponent } from '~shared/workflow-action/workflow-action.component';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [WorkflowActionComponent],
	exports: [WorkflowActionComponent],
})
export class WorkflowActionModule { }
