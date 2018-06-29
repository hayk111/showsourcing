import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

import { ProjectsListViewComponent } from './components';
import { ProjectNavComponent } from './components/project-nav/project-nav.component';
import { ProjectsPageComponent } from './containers';
import { ProjectDetailsComponent } from './containers/project-details/project-details.component';
import { ProjectProductsComponent } from './containers/project-products/project-products.component';
import { ProjectSettingsComponent } from './containers/project-settings/project-settings.component';
import { RatingModule } from '~shared/rating';
import { SidenavModule } from '~shared/sidenav/sidenav.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { ProjectProductListComponent } from './components/project-product-list/project-product-list.component';

@NgModule({
	imports: [
		SharedModule,
		// EffectsModule.forFeature(effects),
		RouterModule.forChild([]),
		SideMenuModule, // side nav
		TopPanelModule, // bread crumb at the top left
		SelectionBarModule, // used for when selecting an item
		TableModule, // used in list
		RatingModule,
		SidenavModule,
		BadgeModule
	],
	declarations: [
		ProjectsPageComponent,
		ProjectsListViewComponent,
		ProjectNavComponent,
		ProjectDetailsComponent,
		ProjectProductsComponent,
		ProjectSettingsComponent,
		ProjectProductListComponent,
	],
	exports: [RouterModule, ProjectsPageComponent],
	providers: [ProjectFeatureService],
})
export class ProjectModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProjectModule,
			providers: [],
		};
	}

}


