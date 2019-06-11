import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { TaskCommonModule } from '~common/task';
import { SampleListViewComponent } from '~features/workspace/components';
import {
	MySampleBoardPageComponent,
	MySampleListPageComponent,
	MySamplePageComponent,
	MyTasksPageComponent,
	MyWorkflowPageComponent,
	WorkspaceComponent,
} from '~features/workspace/containers';
import { routes } from '~features/workspace/routes';
import { SharedModule } from '~shared/shared.module';



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


