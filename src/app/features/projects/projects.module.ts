import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserModule } from '~features/user';
import { EntityPageModule } from '~shared/entity-page';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';
import { EntityModule } from '~entity';

import { ProjectsListViewComponent } from './components';
import { ProjectsPageComponent } from './containers';
import { routes } from './routes';
import { ProjectService } from './services';

@NgModule({
	imports: [
		CommonModule,
		// EffectsModule.forFeature(effects),
		RouterModule.forChild(routes),
		EntityModule.forChild(),
		EntityPageModule, // TODO to be removed and placed inside the component module using it
		NgxDatatableModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it
	],
	declarations: [ProjectsPageComponent, ProjectsListViewComponent],
	exports: [ProjectsPageComponent],
	providers: [ProjectService],
})
export class ProjectsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
			providers: [ProjectService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: ProjectsModule,
		};
	}
}
