import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter
} from '@angular/core';
import { Product, Packaging, Quote } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
@Component({
	selector: 'item-comapre-column-app',
	templateUrl: './item-comapre-column.component.html',
	styleUrls: ['./item-comapre-column.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCompareColumnComponent extends TrackingComponent
	implements OnInit {
	@Input() type: 'title' | 'content' = 'content';
	@Input() product: Product;
	@Input() quote: Quote;
	@Input() priceMatrixLabels = [];

	constructor() {
		super();
	}

	ngOnInit() {}

	getPackagingString(packaging: Packaging): string {
		if (!packaging) {
			return '';
		}
		return `${packaging.width || 0} x ${packaging.height ||
			0} x ${packaging.depth || 0}${packaging.unit}`;
	}

	getPriceMatrixRowByLabel(_label: string) {
		const label = _label.toLowerCase();
		return (
			this.quote.priceMatrix.rows.find(x => x.label.toLowerCase() === label)
				.price || '-'
		);
	}
}
