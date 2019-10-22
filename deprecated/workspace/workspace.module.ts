import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesCommonModule } from '~common/tables/tables-common.module';
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
		TablesCommonModule
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


