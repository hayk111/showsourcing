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
import { ComparisonDataModel } from '~shared/table/models';

@Component({
	selector: 'item-comapre-row-app',
	templateUrl: './item-comapre-row.component.html',
	styleUrls: ['./item-comapre-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCompareRowComponent extends TrackingComponent
	implements OnInit {

		private _comparisonData: ComparisonDataModel[] = [];
	@Input() set comparisonData(value: ComparisonDataModel[]) {
		this._comparisonData = value;
	}
	get comparisonData(): ComparisonDataModel[] {
		return this._comparisonData;
	}

	constructor() {
		super();
	}

	ngOnInit() { }

}
