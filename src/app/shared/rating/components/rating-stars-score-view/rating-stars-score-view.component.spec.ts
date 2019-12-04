import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProductVotes } from '~core/models';
import { RatingModule } from '~shared/rating/rating.module';
import { RatingService } from '~shared/rating/services/rating.service';

import { RatingStarsScoreViewComponent } from './rating-stars-score-view.component';

// TODO Service not working
describe('Rating stars score view', () => {
	let component: RatingStarsScoreViewComponent;
	let fixture: ComponentFixture<RatingStarsScoreViewComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			providers: [RatingService],
			imports: [RatingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(RatingStarsScoreViewComponent);
		component = fixture.componentInstance;
		component.votes = mockProductVotes;
	});

	it('should display only votes that have value > 0', () => {
		expect(component).toBeTruthy();
		const emptyVote = {
			id: 'zero-value-vote',
			value: 0,
			user: {
				id: 'zero-value-user',
				firstName: 'Zero Name',
				lastName: 'Zero Last',
				__typename: 'User'
			},
			__typename: 'ProductVote'
		};

		component.votes = [...component.votes, emptyVote];

		expect(component.votes.filter(vote => vote.value === 0)).toEqual([]);
	});

});
