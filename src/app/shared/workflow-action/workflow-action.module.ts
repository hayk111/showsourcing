import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { WorkflowActionComponent } from '~shared/workflow-action/component/workflow-action.component';
import { WorkflowActionService } from '~shared/workflow-action/service/workflow-action.service';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [WorkflowActionComponent],
	exports: [WorkflowActionComponent],
	// TODO Uncomment when fixed problem with pages
	// providers: [
	// 	WorkflowActionService
	// ]
})
export class WorkflowActionModule { }
