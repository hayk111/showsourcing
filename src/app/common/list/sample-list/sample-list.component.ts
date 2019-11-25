import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sample } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'sample-list-app',
	templateUrl: './sample-list.component.html',
	styleUrls: ['./sample-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListComponent extends TrackingComponent {

	private _samples: Sample[];
	@Input() set samples(samples: Sample[]) {
		this._samples = (samples || []).sort((a, b) => a.status && b.status ? a.status.step - b.status.step : 1);
	}
	get samples() {
		return this._samples;
	}
	@Output() sampleClicked = new EventEmitter<Sample>();

	displayIndex = 3;

	constructor() {
		super();
	}

	colorClass(sample: Sample) {
		switch (sample && sample.status && sample.status.category) {
			case 'new':
				return 'txt-secondary';
			case 'inProgress':
				return 'primary';
			case 'validated':
				return 'success';
			case 'refused':
				return 'warn';
			default:
				return 'secondary';
		}
	}

}
