import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Sort } from '~shared/table/components/sort.interface';
import { Category } from '~features/workspace/models';

@Component({
	selector: 'products-review-card-no-fields-header-app',
	templateUrl: './products-review-card-no-fields-header.component.html',
	styleUrls: ['./products-review-card-no-fields-header.component.scss']
})
export class ProductsReviewCardNoFieldsHeaderComponent {

	@Input() currentSort: Sort;
	@Output() checked = new EventEmitter<Category>();
	@Output() unchecked = new EventEmitter<Category>();

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}

}
