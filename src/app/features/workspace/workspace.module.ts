import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { routes } from '~features/workspace/routes';
import { WorkspaceComponent, MyProductsPageComponent, MyTasksPageComponent, ReviewPageComponent } from '~features/workspace/containers';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		TopPanelModule
	],
	declarations: [
		WorkspaceComponent,
		MyProductsPageComponent,
		MyTasksPageComponent,
		ReviewPageComponent
	],
	exports: [RouterModule],
	providers: [
	]
})
export class WorkspaceModule {

}


