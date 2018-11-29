import { NgModule } from '@angular/core';
import { WorkflowActionComponent } from '~shared/workflow-action/component/workflow-action.component';
import { WorkflowActionService } from '~shared/workflow-action/service/workflow-action.service';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { BadgeModule } from '~shared/badge';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuModule,
		BadgeModule,
		IconsModule
	],
	declarations: [WorkflowActionComponent],
	exports: [WorkflowActionComponent],
	// TODO Uncomment when fixed problem with pages
	providers: [
		WorkflowActionService
	]
})
export class WorkflowActionModule { }
