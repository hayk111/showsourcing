import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2, AfterViewInit } from '@angular/core';
import { Product, ProductStatusType } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';
// import * as Isotope from 'isotope-layout';

@Component({
	selector: 'products-review-card-body-app',
	templateUrl: './products-review-card-body.component.html',
	styleUrls: ['./products-review-card-body.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsReviewCardBodyComponent implements AfterViewInit {

	@Input() products: Product[];
	@Input() selection: Map<string, boolean>;
	@Input() firstStatus: ProductStatusType;
	@Input() index: number;
	@Output() sendToWorkflow = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<any>();
	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();

	// isotope: any;

	constructor(
		private render: Renderer2
	) { }

	ngAfterViewInit() {
		// const element = document.querySelector('.products-section-' + this.index);
		// this.isotope = new Isotope(element, {
		// 	itemSelector: '.element-item',
		// 	layoutMode: 'fitRows'
		// });
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

	sendToWorkflowFunc(event: any, product: Product) {
		// in case we fix in the future the problem with the scrolling when doing the filtering
		// const some = event.srcElement.closest('.element-item');
		// // this.isotope.hideItemElements(some);
		// this.render.addClass(some, 'deleted');
		// this.isotope.arrange({ filter: ':not(.deleted)' });
		this.sendToWorkflow.emit(product);
	}

}