import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackInputComponent } from './components/feedback-input/feedback-input.component';
import { RatingInputComponent } from './components/rating-input/rating-input.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [ FeedbackInputComponent, RatingInputComponent ],
	exports: [ FeedbackInputComponent, RatingInputComponent ]
})
export class FeedbackModule { }
