import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'likes-chart-app',
	templateUrl: './likes-chart.component.html',
	styleUrls: ['./likes-chart.component.scss']
})
export class LikesChartComponent implements OnInit {
	view: any[] = [250, 250];

	result = [
		{
			'name': 'like',
			'value': 5
		},
		{
			'name': 'neutral',
			'value': 1
		},
		{
			'name': 'Despise',
			'value': 2
		}
	];

	colorScheme = {
		domain: ['#71e591', '#EBEBEB', '#D0021B']
	};

	constructor() { }

	ngOnInit() {
	}

}
