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
	@Input() comparisonData: ComparisonDataModel[] = [];

	constructor() {
		super();
	}

	ngOnInit() { }

}
