import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-activity-nav-item-app',
	templateUrl: './product-activity-nav-item.component.html',
	styleUrls: ['./product-activity-nav-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityNavItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
