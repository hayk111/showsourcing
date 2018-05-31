import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';

import { ProjectsListViewComponent } from './components';
import { ProjectsPageComponent } from './containers';
import { routes } from './routes';
import { TableModule } from '~shared/table';
import { UserModule } from '~features/user';
import { ProjectNavComponent } from './components/project-nav/project-nav.component';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		// EffectsModule.forFeature(effects),
		RouterModule.forChild([]),
		SideMenuModule, // side nav
		TopPanelModule, // bread crumb at the top left
		SelectionBarModule, // used for when selecting an item
		TableModule, // used in list
	],
	declarations: [ProjectsPageComponent, ProjectsListViewComponent, ProjectNavComponent],
	exports: [RouterModule, ProjectsPageComponent],
	providers: [],
})
export class ProjectModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProjectModule,
			providers: [],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: ProjectModule,
		};
	}
}


