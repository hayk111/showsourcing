import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';
import { EntityModule } from '~entity';

import { ProjectsListViewComponent } from './components';
import { ProjectsPageComponent } from './containers';
import { routes } from './routes';
import { TableModule } from '~app/shared/table';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { UserModule } from '~app/features/user';
import { ProjectNavComponent } from './components/project-nav/project-nav.component';

@NgModule({
	imports: [
		CommonModule,
		// EffectsModule.forFeature(effects),
		RouterModule.forChild(routes),
		EntityModule.forChild(),
		EntityPagesModule,
		UtilsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it,
		TableModule, // used in list
	],
	declarations: [ProjectsPageComponent, ProjectsListViewComponent, ProjectNavComponent],
	exports: [ProjectsPageComponent],
	providers: [],
})
export class ProjectsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
			providers: [],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
		};
	}
}
