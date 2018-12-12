import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductElementModule } from '~common/product/product-elements-module';
import { SampleCommonModule } from '~common/sample';
import { TaskCommonModule } from '~common/task';
import {
	ProductsReviewCardHeaderComponent,
	ProductsReviewCardViewComponent,
	ProductsReviewSortingMenuComponent,
	SampleBoardViewComponent,
	SampleListViewComponent,
} from '~features/workspace/components';
import {
	MySamplePageComponent,
	MyTasksPageComponent,
	MyWorkflowPageComponent,
	ReviewPageComponent,
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
		ProductElementModule,
		SampleCommonModule
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
	providers: []
})
export class WorkspaceModule {

}


