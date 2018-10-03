import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Sort } from '~shared/table/components/sort.interface';
import { Category } from '~features/workspace/models';

@Component({
	selector: 'products-review-card-header-app',
	templateUrl: './products-review-card-header.component.html',
	styleUrls: ['./products-review-card-header.component.scss']
})
export class ProductsReviewCardHeaderComponent {

	@Input() currentSort: Sort;
	@Input() category: Category;
	@Output() checked = new EventEmitter<Category>();
	@Output() unchecked = new EventEmitter<Category>();

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}

}
