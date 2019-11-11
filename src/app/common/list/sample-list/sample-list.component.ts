import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Sample } from '~core/models';

@Component({
	selector: 'sample-list-app',
	templateUrl: './sample-list.component.html',
	styleUrls: ['./sample-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListComponent {

	@Input() samples: Array<Sample>;

	constructor() {}

	trackByFn(sample: Sample) {
		return sample.id;
	}
}
