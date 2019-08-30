import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons/icons.module';
import { RatingCylinderComponent } from '~shared/rating/components/rating-cylinder/rating-cylinder.component';
import { RatingHeartComponent } from '~shared/rating/components/rating-heart/rating-heart.component';
import { ThumbButtonsComponent } from '~shared/rating/components/thumb-buttons/thumb-buttons.component';
import { UtilsModule } from '~shared/utils';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UtilsModule,
		TranslateModule
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
