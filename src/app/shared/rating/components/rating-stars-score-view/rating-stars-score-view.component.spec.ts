import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStarsScoreViewComponent } from './rating-stars-score-view.component';
import { mockVotes } from '~core/models';


describe('Rating stars score view', () => {
	let component: RatingStarsScoreViewComponent;
	let fixture: ComponentFixture<RatingStarsScoreViewComponent>;
	let el: HTMLElement;

	beforeEach(() => {
		fixture = TestBed.createComponent(RatingStarsScoreViewComponent);
		component = fixture.componentInstance;
		el = fixture.nativeElement;

		component.votes = mockVotes;
	});

	it('should display only votes that have value => 0', () => {

	});

});
