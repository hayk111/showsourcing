import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TabModel } from '~shared/navbar';

@Component({
	selector: 'product-navigation-app',
	templateUrl: './product-navigation.component.html',
	styleUrls: ['./product-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductNavigationComponent implements OnInit {
	tabs: TabModel[] = [
		{
			title: 'Activity',
			link: 'activity'
		},
		{
			title: 'Shipping',
			link: 'shipping'
		},
		{
			title: 'Samples',
			link: 'samples'
		},
		{
			title: 'Tasks',
			link: 'tasks'
		}
	];

	constructor() { }

	ngOnInit() {
	}

}
