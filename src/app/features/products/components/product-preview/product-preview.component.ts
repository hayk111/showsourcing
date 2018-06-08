import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent implements OnInit {
	@Input() product: Product;

	constructor() { }

	ngOnInit() {
	}

}
