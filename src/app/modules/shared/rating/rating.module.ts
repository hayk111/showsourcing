import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackInputComponent } from './components/feedback-input/feedback-input.component';
import { RatingHeartComponent } from './components/rating-heart/rating-heart.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [
		FeedbackInputComponent,
		RatingHeartComponent
	],
	exports: [
		FeedbackInputComponent,
		RatingHeartComponent
	]
})
export class FeedbackModule { }
