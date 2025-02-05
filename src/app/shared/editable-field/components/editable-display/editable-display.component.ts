import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'editable-display-app',
	templateUrl: './editable-display.component.html',
	styleUrls: ['./editable-display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexVAlign]': 'vAlign',
		'[class.pointer]': '!disabled'
	}
})
export class EditableDisplayComponent {

	@Input() vAlign = true;
	@Input() disabled = false;

}
