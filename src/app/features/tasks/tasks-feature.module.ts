import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/tasks/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import * as Pages from './pages';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ActivityCommonModule,
		CommonModule,
		NavBarModule,
		SharedModule,
		PreviewsCommonModule,
		TablesCommonModule
	],
	declarations: [
		Pages.TasksPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
	]
})
export class TasksFeatureModule {

}
