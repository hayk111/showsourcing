import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'compare-column-app',
	templateUrl: './compare-column.component.html',
	styleUrls: ['./compare-column.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareColumnComponent implements OnInit {
	@Input() product: Product;
	constructor() { }

	ngOnInit() {
	}

	/** Trackby function for ngFor */
	trackByFn(index, tag) {
		return tag.name;
	}

}
