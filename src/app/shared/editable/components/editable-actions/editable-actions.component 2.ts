import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'editable-actions-app',
	templateUrl: './editable-actions.component.html',
	styleUrls: ['./editable-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableActionsComponent {

	@Output() cancel = new EventEmitter();
	@Output() save = new EventEmitter();

	onSaveClick(event: MouseEvent) {
		event.stopImmediatePropagation();
		this.save.emit();
	}

	onCancelClick(event: MouseEvent) {
		event.stopImmediatePropagation();
		this.cancel.emit();
	}
}
