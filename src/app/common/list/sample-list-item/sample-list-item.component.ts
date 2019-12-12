import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { Sample } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'sample-list-item-app',
	templateUrl: './sample-list-item.component.html',
	styleUrls: ['./sample-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListItemComponent extends TrackingComponent {
	@Input() sample: Sample;
	@Input() hasSelection = true;
	@Input() selection: Map<string, boolean>;

	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();

	constructor(public translate: TranslateService) { super(); }

	isSelected(row) {
		if (!this.hasSelection)
			return false;

		if (this.selection)
			return this.selection.has(row.id);

		throw Error(`Selection Input is undefnied`);
	}
}
