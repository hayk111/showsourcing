import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModule } from '~features/user';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';
import { EntityModule } from '~entity';

import { ProjectsListViewComponent } from './components';
import { ProjectsPageComponent } from './containers';
import { routes } from './routes';
import { ProjectHttpService } from './services';
import { TableModule } from '~app/shared/table';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';

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
	declarations: [ProjectsPageComponent, ProjectsListViewComponent],
	exports: [ProjectsPageComponent],
	providers: [ProjectHttpService],
})
export class ProjectsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
			providers: [ProjectHttpService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
		};
	}
}
