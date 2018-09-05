import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'product-filters-btns-app',
	templateUrl: './product-filters-btns.component.html',
	styleUrls: ['./product-filters-btns.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersBtnsComponent implements OnInit {
	/** when a button is clicked */
	@Output() typeClicked = new EventEmitter<string>();
	/** filter type where there is a btn for */
	filterTypes = [
		'project',
		'category',
		'supplier',
		'tags',
		'status',
		'event',
	];

	constructor() { }

	ngOnInit() {
	}

}
