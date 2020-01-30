import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product, ERM } from '~core/erm';

@Component({
	selector: 'compare-column-app',
	templateUrl: './compare-column.component.html',
	styleUrls: ['./compare-column.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareColumnComponent implements OnInit {
	@Input() product: Product;
	@Output() update = new EventEmitter<any>();
	erm = ERM;

	constructor() { }

	ngOnInit() {
	}

	/** Trackby function for ngFor */
	trackByFn(index, tag) {
		return tag.name;
	}

	updateProp(value: any, prop: string) {
		// we do this exclusively here, since its a dialog, and we don't query many
		// these products are static and are not refetched or queried inside the dialog
		this.product = { ...this.product, [prop]: value };
		this.update.emit({ id: this.product.id, [prop]: value });
	}

	getTagsName() {
		return (this.product.tags || []).map(tag => tag.name).join(', ');
	}
}
