import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-navigation-app',
	templateUrl: './product-navigation.component.html',
	styleUrls: ['./product-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductNavigationComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
