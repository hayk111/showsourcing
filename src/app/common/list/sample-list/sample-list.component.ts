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

	@Input() samples: { count: Number, items: Array<Sample> };
	@Output() sampleClicked = new EventEmitter<Sample>();

	constructor() {
		super();
	}

}
