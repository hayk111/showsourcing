import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'editable-value-app',
	templateUrl: './editable-value.component.html',
	styleUrls: ['./editable-value.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'ellipsis flexVAlign',
		'[class.with-overflow]': 'hasOverflow',
	}
})
export class EditableValueComponent {
	@Input() primary = false;
	@Input() resizable = true;
	@Input() hasOverflow = false;
}
