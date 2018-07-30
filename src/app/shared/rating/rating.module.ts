import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons/icons.module';
import { RatingHeartComponent } from '~shared/rating/components/rating-heart/rating-heart.component';
import { ThumbButtonsComponent } from '~shared/rating/components/thumb-buttons/thumb-buttons.component';

import { DoubleThumbsComponent } from './components/double-thumbs/double-thumbs.component';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		DoubleThumbsComponent
	],
	exports: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		DoubleThumbsComponent
	]
})
export class RatingModule { }
