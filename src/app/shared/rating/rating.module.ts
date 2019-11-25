import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from '~shared/divider/divider.module';
import { IconsModule } from '~shared/icons/icons.module';
import { UtilsModule } from '~shared/utils';

import {
	RatingBadgeComponent,
	RatingCylinderComponent,
	RatingDashboardComponent,
	RatingHeartComponent,
	RatingNumberBadgeComponent,
	RatingStarsActionComponent,
	RatingStarsScoreViewComponent,
	ThumbButtonsComponent,
} from './components';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule,
		TranslateModule,
		DividerModule
	],
	declarations: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		RatingCylinderComponent,
		RatingStarsScoreViewComponent,
		RatingStarsActionComponent,
		RatingDashboardComponent,
		RatingBadgeComponent,
		RatingNumberBadgeComponent,
	],
	exports: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		RatingCylinderComponent,
		RatingDashboardComponent,
		RatingStarsScoreViewComponent,
		RatingStarsActionComponent,
		RatingBadgeComponent,
		RatingNumberBadgeComponent,
	]
})
export class RatingModule { }
