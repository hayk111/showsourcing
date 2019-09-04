import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';

@Component({
	selector: 'product-modal-top-panel',
	templateUrl: './product-modal-top-panel.component.html',
	styleUrls: ['./product-modal-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTopPanelComponent implements OnInit, OnChanges {
	@Input() product: Product;
	@Input() selectedIndex: number;
	@Input() isOpen = false;
	@Output() delete = new EventEmitter<Product>();
	@Output() close = new EventEmitter<any>();
	@Output() openFileBrowser = new EventEmitter<void>();
	menuOpen = false;
	productEntity = ERM.PRODUCT;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		if ((changes && changes.isOpen && changes.isOpen.previousValue) && !changes.isOpen.currentValue) {
			this.menuOpen = false;
		}
	}

	ngOnInit() {
	}

	closePanel() {
		this.menuOpen = false;
		this.close.emit();
	}

	getImg() {
		return this.product.images ? this.product.images[this.selectedIndex] : null;
	}

}
