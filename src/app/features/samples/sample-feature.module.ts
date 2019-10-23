import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/samples/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import { SamplesPageComponent } from './containers';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ActivityCommonModule,
		CommonModule,
		NavBarModule,
		SharedModule,
		PreviewsCommonModule,
		TablesCommonModule,
		BoardsCommonModule
	],
	declarations: [
		SamplesPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
	]
})
export class SampleFeatureModule {

}
