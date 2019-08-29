import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { TaskCommonModule } from '~common/task';
import { SharedModule } from '~shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import {
	MySampleBoardPageComponent,
	MySampleListPageComponent,
	MySamplePageComponent,
	MyTasksPageComponent,
	MyWorkflowPageComponent,
	WorkspaceComponent,
} from '~features/workspace/containers';
import { routes } from '~features/workspace/routes';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TaskCommonModule,
		ProductCommonModule,
		ProductCommonModule,
		SampleCommonModule,
		TranslateModule
	],
	declarations: [
		WorkspaceComponent,
		MyWorkflowPageComponent,
		MyTasksPageComponent,
		MySamplePageComponent,
		MySampleBoardPageComponent,
		MySampleListPageComponent,
	],
	exports: [RouterModule],
	providers: []
})
export class WorkspaceModule {

}


