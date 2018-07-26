import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex flexCenter flexColumn'
	}
})
export class DashboardComponent implements OnInit {

	testProduct = {
		'id': 'ac0eee6c-02a1-474d-9bf6-585b06c6cd5b',
		'name': 'VEDE-0001-AP',
		'creationDate': 'Sun Jan 18 1970 04:25:53 GMT+0000 (UTC)',
		'createdBy': {
			'id': '866a8f83-dadc-4ff8-a042-377bb8fe798c',
			'firstName': 'Elyssa',
			'lastName': 'Verhoogen',
			'avatar': null
		},
		'supplier': {
			'id': '71144d98-2d05-44db-86c4-35d2d50b0784',
			'name': 'Supp 10052',
			'description': null,
			'logoImage': null
		},
<<<<<<< HEAD
		'favorite': false
	};

=======
		'images': [
			{
				'fileName': '27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg'
			},
			{
				'fileName': '3d95dbe5-7016-435c-9035-af4a1361b5be.jpg'
			},
			{
				'fileName': '3d95dbe5-7016-435c-9035-af4a1361b5be.jpg'
			},
			{
				'fileName': '98dfaab1-e4df-41b0-ab7b-a857acdd0986.jpg'
			},
			{
				'fileName': '84554ab8-59a4-4a61-b39d-46deb5516a4a.jpg'
			}
		],
		'minimumOrderQuantity': 240,
		'price': {
			'value': 0,
			'currency': 'USD'
		},
		'favorite': true
	};

	testProducts = [this.testProduct];

>>>>>>> rebasing
	constructor() { }

	ngOnInit() {
	}

}
