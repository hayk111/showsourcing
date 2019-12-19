import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sample } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';
import { StatusUtils } from '~utils';

@Component({
	selector: 'sample-catalog-app',
	templateUrl: './sample-catalog.component.html',
	styleUrls: ['./sample-catalog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleCatalogComponent extends TrackingComponent {

	private _samples: Sample[];
	@Input() set samples(samples: Sample[]) {
		this._samples = (samples || []).sort((a, b) => a.status && b.status ? a.status.step - b.status.step : 1);
	}
	get samples() {
		return this._samples;
	}
	@Output() sampleClicked = new EventEmitter<Sample>();

	statusUtils = StatusUtils;
	displayIndex = 3;

	constructor() {
		super();
	}

}