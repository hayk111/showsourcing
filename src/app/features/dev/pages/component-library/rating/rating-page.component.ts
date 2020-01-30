import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { mockProductVotes } from '~core/orm/models';

@Component({
	selector: 'rating-page-app',
	templateUrl: './rating-page.component.html',
	styleUrls: ['./rating-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPageComponent implements OnInit {

	mockProd =
		{
			id: '27b285c5-9c7d-43ed-8a66-e582a1ce326b',
			name: 'This is the lawrd',
			score: 100,
			lastUpdatedDate: '2019-08-27T08:26:28.000Z',
			creationDate: '2019-08-20T13:33:52.000Z',
			archived: false,
			deleted: false,

			createdBy: {
				id: 'd77e538b-5c9f-4e84-ae79-0d933531a439',
				firstName: 'Mauna',
				lastName: 'Kea',
				__typename: 'User'
			},
			lastUpdatedBy: {
				id: 'd77e538b-5c9f-4e84-ae79-0d933531a439',
				firstName: 'Mauna',
				lastName: 'Kea',
				__typename: 'User'
			},
			votes: mockProductVotes,
			__typename: 'Product'
		};

	constructor() { }

	ngOnInit() {
	}

}
