import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2, AfterViewInit } from '@angular/core';
import { Product, ProductStatusType, ERM } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { AnimatedCardComponent } from '~shared/animated-stack/components/animated-card/animated-card.component';
// import * as Isotope from 'isotope-layout';

@Component({
	selector: 'products-review-card-body-app',
	templateUrl: './products-review-card-body.component.html',
	styleUrls: ['./products-review-card-body.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsReviewCardBodyComponent extends TrackingComponent implements AfterViewInit {

	@Input() products: Product[];
	@Input() selection: Map<string, boolean>;
	@Input() firstStatus: ProductStatusType;
	@Input() index: number;
	@Output() sendToWorkflow = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<any>();
	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();

	prodERM = ERM.PRODUCT;

	constructor(
		private render: Renderer2
	) {
		super();
	}

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
	onStatusUpdated(product, status, card) {
		if (status) {
			card.destroy().subscribe(_ => this.statusUpdated.emit({ product, status }));
		}
	}

	sendToWorkflowFunc(product: Product, card: AnimatedCardComponent) {
		card.destroy().subscribe(_ => this.sendToWorkflow.emit(product));
	}

	archiveFunc(product: Product, card: AnimatedCardComponent) {
		card.destroy().subscribe(_ => this.archive.emit(product));
	}

	deleteFunc(product: Product, card: AnimatedCardComponent) {
		card.destroy().subscribe(_ => this.delete.emit(product));
	}

}
