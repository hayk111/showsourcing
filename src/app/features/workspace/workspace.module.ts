import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogCommonModule } from '~common/dialog';
import { ProductCommonModule } from '~common/product/product-common.module';
import { TaskCommonModule } from '~common/task';
import { Workflow2Module } from '~features/workflow2/workflow2.module';
import {
	ProductsReviewCardHeaderComponent,
	ProductsReviewCardViewComponent,
	ProductsReviewSortingMenuComponent,
} from '~features/workspace/components';
import {
	MyTasksPageComponent,
	MyWorkflowPageComponent,
	ReviewPageComponent,
	WorkspaceComponent,
} from '~features/workspace/containers';
import { routes } from '~features/workspace/routes';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { AnimatedStackModule } from '~shared/animated-stack/animated-stack.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';

import { ProductsReviewCardBodyComponent } from './components/products-review-card-body/products-review-card-body.component';


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
		StatusSelectorModule,
		DialogCommonModule,
		AnimatedStackModule
	],
	declarations: [
		WorkspaceComponent,
		MyWorkflowPageComponent,
		MyTasksPageComponent,
		ReviewPageComponent,
		ProductsReviewCardViewComponent,
		ProductsReviewCardHeaderComponent,
		ProductsReviewSortingMenuComponent,
		ProductsReviewCardBodyComponent
	],
	exports: [RouterModule],
	providers: [
		WorkspaceFeatureService
	]
})
export class WorkspaceModule {

}


