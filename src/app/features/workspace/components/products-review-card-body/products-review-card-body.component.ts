import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Product, ProductStatusType } from '~models';

@Component({
	selector: 'products-review-card-body-app',
	templateUrl: './products-review-card-body.component.html',
	styleUrls: ['./products-review-card-body.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsReviewCardBodyComponent implements OnInit {

	@Input() products: Product[];
	@Input() selection: Map<string, boolean>;
	@Input() firstStatus: ProductStatusType;
	@Output() sentToWorkflow = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<any>();
	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	/** Checks if a product is selected */
	isSelected(product) {
		if (this.selection)
			return this.selection.has(product.id);

		throw Error(`Selection Input is undefnied`);
	}

	/** Close the contextual menu if the mouse goes outside a product card */
	closeContextualMenuIfOpened(archiveMenu, workActionMenu) {
		if (archiveMenu && archiveMenu.menuOpen) {
			archiveMenu.closeMenu();
		}
		if (workActionMenu && workActionMenu.menuOpen) {
			workActionMenu.closeMenu();
		}
	}

	/** Triggers a status update (from the workflow action component) */
	onStatusUpdated(product, status) {
		if (status) {
			this.statusUpdated.emit({ product, status });
		}
	}
}
