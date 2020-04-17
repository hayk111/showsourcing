import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'editable-value-app',
	templateUrl: './editable-value.component.html',
	styleUrls: ['./editable-value.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'ellipsis flexVAlign',
	}
})
export class EditableValueComponent {


}
