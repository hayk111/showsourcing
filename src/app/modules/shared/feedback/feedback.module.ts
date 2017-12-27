import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackInputComponent } from './components/feedback-input/feedback-input.component';
import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { MatIconModule } from '@angular/material';
import { FeedbackInputEntityComponent } from './components/feedback-input-entity/feedback-input-entity.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule
	],
	declarations: [ FeedbackInputComponent, RatingInputComponent, FeedbackInputEntityComponent ],
	exports: [ FeedbackInputComponent, FeedbackInputEntityComponent, RatingInputComponent ]
})
export class FeedbackModule { }
