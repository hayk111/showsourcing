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
	SampleListViewComponent,
	SampleBoardViewComponent,
} from '~features/workspace/components';
import {
	MyTasksPageComponent,
	MyWorkflowPageComponent,
	ReviewPageComponent,
	WorkspaceComponent,
	MySamplePageComponent,
} from '~features/workspace/containers';
import { routes } from '~features/workspace/routes';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { SharedModule } from '~shared/shared.module';

import { ProductsReviewCardBodyComponent } from './components/products-review-card-body/products-review-card-body.component';


@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		Workflow2Module, // TODO REMOVE WHEN KANBAN USED
		TaskCommonModule,
		ProductCommonModule,
		DialogCommonModule,
	],
	declarations: [
		WorkspaceComponent,
		MyWorkflowPageComponent,
		MyTasksPageComponent,
		ReviewPageComponent,
		ProductsReviewCardViewComponent,
		ProductsReviewCardHeaderComponent,
		ProductsReviewSortingMenuComponent,
		ProductsReviewCardBodyComponent,
		MySamplePageComponent,
		SampleListViewComponent,
		SampleBoardViewComponent
	],
	exports: [RouterModule],
	providers: [
		WorkspaceFeatureService
	]
})
export class WorkspaceModule {

}


