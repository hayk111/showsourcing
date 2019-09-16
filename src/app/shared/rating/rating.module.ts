import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons/icons.module';
import { UtilsModule } from '~shared/utils';

import {
	RatingCylinderComponent,
	RatingHeartComponent,
	RatingStarsActionComponent,
	RatingStarsScoreViewComponent,
	ThumbButtonsComponent,
} from './components';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule
	],
	declarations: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		RatingCylinderComponent,
		RatingStarsScoreViewComponent,
		RatingStarsActionComponent
	],
	exports: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		RatingCylinderComponent,
		RatingStarsScoreViewComponent,
		RatingStarsActionComponent
	]
})
export class RatingModule { }
