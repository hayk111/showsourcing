import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'editable-label-app',
	templateUrl: './editable-label.component.html',
	styleUrls: ['./editable-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'mg-right-ms'
	}
})
export class EditableLabelComponent {


}
