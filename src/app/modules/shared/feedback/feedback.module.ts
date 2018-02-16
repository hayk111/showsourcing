import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackInputComponent } from './components/feedback-input/feedback-input.component';
import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { FeedbackInputEntityComponent } from './components/feedback-input-entity/feedback-input-entity.component';
import { RatingHeartComponent } from './components/rating-heart/rating-heart.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [ FeedbackInputComponent, RatingInputComponent, FeedbackInputEntityComponent, RatingHeartComponent ],
	exports: [ FeedbackInputComponent, FeedbackInputEntityComponent, RatingInputComponent, RatingHeartComponent ]
})
export class FeedbackModule { }
