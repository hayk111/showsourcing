import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ERM } from '~models';
import { ComparisonDataModel } from '~shared/table/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'item-compare-row-app',
	templateUrl: './item-compare-row.component.html',
	styleUrls: ['./item-compare-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCompareRowComponent extends TrackingComponent implements OnInit {

	private _comparisonData: ComparisonDataModel[] = [];
	@Input() set comparisonData(value: ComparisonDataModel[]) {
		this._comparisonData = value;
	}
	get comparisonData(): ComparisonDataModel[] {
		return this._comparisonData;
	}

	erm = ERM;

	constructor() {
		super();
	}

	ngOnInit() { }

}
