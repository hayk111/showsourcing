import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbButtonsComponent } from '~shared/rating/components/thumb-buttons/thumb-buttons.component';
import { RatingHeartComponent } from '~shared/rating/components/rating-heart/rating-heart.component';
import { IconsModule } from '~shared/icons/icons.module';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [
		ThumbButtonsComponent,
		RatingHeartComponent
	],
	exports: [
		ThumbButtonsComponent,
		RatingHeartComponent
	]
})
export class RatingModule { }
