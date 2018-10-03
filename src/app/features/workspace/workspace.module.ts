import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { routes } from '~features/workspace/routes';
import { ProductsReviewCardViewComponent, ProductsReviewSortingMenuComponent } from '~features/workspace/components';
import { WorkspaceComponent, MyWorkflowPageComponent, MyTasksPageComponent, ReviewPageComponent } from '~features/workspace/containers';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { SelectionBarModule } from '~shared/selection-bar';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { Workflow2Module } from '~features/workflow2/workflow2.module';
import { TaskCommonModule } from '~shared/task-common';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { CustomDialogModule } from '~shared/custom-dialog';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		TopPanelModule,
		SelectionBarModule,
		ActionBarModule,
		Workflow2Module,
		TaskCommonModule,
		ProductCommonModule,
		WorkflowActionModule,
		CustomDialogModule
	],
	declarations: [
		WorkspaceComponent,
		MyWorkflowPageComponent,
		MyTasksPageComponent,
		ReviewPageComponent,
		ProductsReviewCardViewComponent,
		ProductsReviewSortingMenuComponent
	],
	exports: [RouterModule],
	providers: [
		WorkspaceFeatureService
	]
})
export class WorkspaceModule {

}


