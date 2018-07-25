import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

	testProduct = {
		'id': 'ac0eee6c-02a1-474d-9bf6-585b06c6cd5b',
		'creationDate': 'Sun Jan 18 1970 04:25:53 GMT+0000 (UTC)',
		'createdBy': {
			'id': '6c0b95d4-5e77-4caa-b826-b471e700d1d7',
			'firstName': 'Antoine',
			'lastName': 'Praet',
			'avatar': {
				'id': '5a610e5f-10dc-47be-b100-a21cd928c102',
				'fileName': '5a610e5f-10dc-47be-b100-a21cd928c102.jpg'
			}
		},
		'supplier': {
			'id': '71144d98-2d05-44db-86c4-35d2d50b0784',
			'name': 'Supp 10052',
			'description': null
		},
		'favorite': false
	};

	constructor() { }

	ngOnInit() {
	}

}
