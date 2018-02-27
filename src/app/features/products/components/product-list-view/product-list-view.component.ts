import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '~products';
import { FilterActions } from '~store/action/misc/filter.action';
import { FilterGroupName, FilterSort } from '~store/model/misc/filter.model';
import { Log } from '~app/app-root/utils';

@Component({
	selector: 'product-list-view-app',
	templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListViewComponent implements OnInit {
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productOpen = new EventEmitter<string>();
	@Output() productFavorited = new EventEmitter<string>();
	@Output() productUnfavorited = new EventEmitter<string>();
	@Input() products: Array<Product>;
	@Input() selections: Map<string, boolean>;

	constructor() {}

	ngOnInit() {
		Log.info('table init');
	}

	onActivate(event) {
		if (event.type === 'click' || event.type === 'keydown') {
			this.productOpen.emit(event.row.id);
		}
	}

	onSort(event) {
		const sortOrder = event.newValue.toUpperCase();
		const value = event.column.prop;
		const filter = new FilterSort(value, sortOrder);
	}

	onCheck(event, productId) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.checked) this.productSelect.emit(productId);
		else this.productUnselect.emit(productId);
	}

	// we need to stop the propagation on the checkbox click so we don't open the product
	onCheckboxClick(event) {
		event.stopPropagation();
	}

	onRateClick(currentRating: number, productId: string) {
		if (currentRating === 5)
			this.productUnfavorited.emit(productId);
		else
			this.productFavorited.emit(productId);
	}
}
