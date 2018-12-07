import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter
} from '@angular/core';
import { Product, Packaging, Quote } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { ComparisonDataModel } from '../ComparisonDataModel';
@Component({
	selector: 'item-comapre-row-app',
	templateUrl: './item-comapre-row.component.html',
	styleUrls: ['./item-comapre-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCompareRowComponent extends TrackingComponent
	implements OnInit {
	@Input() type: 'title' | 'content' = 'content';
	@Input() product: Product;
	@Input() quote: Quote;
	@Input() priceMatrixLabels = [];

	@Input() comparisonData: ComparisonDataModel[] = [];

	constructor() {
		super();
	}

	ngOnInit() { }

	getPackagingString(packaging: Packaging): string {
		if (!packaging) {
			return '';
		}
		return `${packaging.width || 0} x ${packaging.height ||
			0} x ${packaging.depth || 0}${packaging.unit}`;
	}

	getPriceMatrixRowByLabel(_label: string) {
		const label = String(_label).toLowerCase();
		const priceMatrix = this.quote.priceMatrix.rows.find(x => String(x.label).toLowerCase() === label);
		return (
			(priceMatrix && priceMatrix.price.value) || '-'
		);
	}
}
