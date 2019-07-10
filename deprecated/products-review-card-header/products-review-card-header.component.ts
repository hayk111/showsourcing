import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '~features/workspace/models';
import { Sort } from '~shared/table/components/sort.interface';

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
