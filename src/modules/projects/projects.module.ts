import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EntityPageModule } from '~shared/entity-page/entity-page.module';
import { SelectionBarModule } from '~shared/selection-bar/selection-bar.module';
import { UtilsModule } from '~shared/utils/utils.module';
import { AppStoreModule } from '~store/store.module';
import { UserModule } from '~user';

import { ProjectsListViewComponent } from './components/projects-list-view/projects-list-view.component';
import { ProjectsPageComponent } from './containers/projects-page/projects-page.component';
import { ProjectService } from '~modules/projects';

@NgModule({
	imports: [
		CommonModule,
		// EffectsModule.forFeature(effects),
		AppStoreModule.forChild(), // TODO to be removed and placed inside the component module using it
		EntityPageModule, // TODO to be removed and placed inside the component module using it
		NgxDatatableModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it
	],
	declarations: [ ProjectsPageComponent, ProjectsListViewComponent ],
	exports: [ ProjectsPageComponent ],
	providers: [ ProjectService ]
})
export class ProjectsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
			providers: [ ProjectService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
		};
	}
}
