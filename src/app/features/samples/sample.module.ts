import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { ProductCommonModule } from '~common/product';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/samples/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import { SamplesPageComponent } from './containers';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		ProductCommonModule,
		SharedModule,
		PreviewsCommonModule,
		TablesCommonModule
	],
	declarations: [
		SamplesPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
	]
})
export class SampleModule {

}
