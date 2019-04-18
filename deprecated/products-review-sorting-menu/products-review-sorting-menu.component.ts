import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'products-review-sorting-menu-app',
	templateUrl: './products-review-sorting-menu.component.html',
	styleUrls: ['./products-review-sorting-menu.component.scss']
})
export class ProductsReviewSortingMenuComponent implements OnInit {
	@Input() currentSort: { sortBy: 'supplier.name', descending: true };
	@Output() sortFromMenu = new EventEmitter<string>();

	constructor() { }

	ngOnInit() { }
}
