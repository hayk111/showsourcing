import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { Sample } from '~core/models';

@Component({
	selector: 'sample-list-item-app',
	templateUrl: './sample-list-item.component.html',
	styleUrls: ['./sample-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListItemComponent extends TrackingComponent {
	@Input() sample: Sample;

}
