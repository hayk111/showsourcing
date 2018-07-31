import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbButtonsComponent } from '~shared/rating/components/thumb-buttons/thumb-buttons.component';
import { RatingHeartComponent } from '~shared/rating/components/rating-heart/rating-heart.component';
import { IconsModule } from '~shared/icons/icons.module';
import { RatingCylinderComponent } from './components/rating-cylinder/rating-cylinder.component';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		RatingCylinderComponent
	],
	exports: [
		ThumbButtonsComponent,
		RatingHeartComponent,
		RatingCylinderComponent
	]
})
export class RatingModule { }
