import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { routes } from '~features/workspace/routes';
import { WorkspaceComponent, MyProductsPageComponent, MyTasksPageComponent, ReviewPageComponent } from '~features/workspace/containers';
import { WorkspaceWorkflowFeatureService } from '~features/workspace/services/workspace-workflow-feature.service';
import { SelectionBarModule } from '~shared/selection-bar';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { WorkflowModule } from '~features/workflow/workflow.module';
import { TaskModule } from '~shared/task';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		TopPanelModule,
		SelectionBarModule,
		ActionBarModule,
		WorkflowModule,
		TaskModule
	],
	declarations: [
		WorkspaceComponent,
		MyProductsPageComponent,
		MyTasksPageComponent,
		ReviewPageComponent
	],
	exports: [RouterModule],
	providers: [
		WorkspaceWorkflowFeatureService
	]
})
export class WorkspaceModule {

}


