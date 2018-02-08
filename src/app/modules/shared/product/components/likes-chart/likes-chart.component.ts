import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
	selector: 'likes-chart-app',
	templateUrl: './likes-chart.component.html',
	styleUrls: ['./likes-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
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
		domain: [
			// success
			'#71e591',
			'#EBEBEB',
			// warn
			'#f94259']
	};

	constructor() { }

	ngOnInit() {
	}

}
