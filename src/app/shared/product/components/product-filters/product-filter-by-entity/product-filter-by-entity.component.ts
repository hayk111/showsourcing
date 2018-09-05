import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-filter-by-entity-app',
	templateUrl: './product-filter-by-entity.component.html',
	styleUrls: ['./product-filter-by-entity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFilterByEntityComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
