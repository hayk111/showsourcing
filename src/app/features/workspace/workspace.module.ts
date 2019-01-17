import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { TaskCommonModule } from '~common/task';
import {
	ProductsReviewCardHeaderComponent,
	ProductsReviewCardViewComponent,
	ProductsReviewSortingMenuComponent,
	SampleListViewComponent
} from '~features/workspace/components';
import {
	MySamplePageComponent,
	MySampleBoardPageComponent,
	MySampleListPageComponent,
	MyTasksPageComponent,
	MyWorkflowPageComponent,
	WorkspaceComponent,
} from '~features/workspace/containers';
import { routes } from '~features/workspace/routes';
import { SharedModule } from '~shared/shared.module';

import { ProductsReviewCardBodyComponent } from './components/products-review-card-body/products-review-card-body.component';


@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TaskCommonModule,
		ProductCommonModule,
		ProductCommonModule,
		SampleCommonModule
	],
	declarations: [
		WorkspaceComponent,
		MyWorkflowPageComponent,
		MyTasksPageComponent,
		ProductsReviewCardViewComponent,
		ProductsReviewCardHeaderComponent,
		ProductsReviewSortingMenuComponent,
		ProductsReviewCardBodyComponent,
		MySamplePageComponent,
		MySampleBoardPageComponent,
		MySampleListPageComponent,
		SampleListViewComponent
	],
	exports: [RouterModule],
	providers: []
})
export class WorkspaceModule {

}


