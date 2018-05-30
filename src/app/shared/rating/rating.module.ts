import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbButtonsComponent } from './components/thumb-buttons/thumb-buttons.component';
import { RatingHeartComponent } from './components/rating-heart/rating-heart.component';
import { IconsModule } from '../icons/icons.module';

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
