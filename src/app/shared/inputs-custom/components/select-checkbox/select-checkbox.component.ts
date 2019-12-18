import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectionState } from '~core/list-page';


@Component({
	selector: 'select-checkbox-app',
	templateUrl: './select-checkbox.component.html',
	styleUrls: ['./select-checkbox.component.scss']
})
export class SelectCheckboxComponent {
	@Input() boxColor = 'primary';
	@Input() size = 16;
	@Output() update = new EventEmitter<SelectionState>();
	@Output() check = new EventEmitter<null>();
	@Output() uncheck = new EventEmitter<null>();

	private _state: SelectionState;

	@Input()
	get state(): SelectionState { return this._state; }
	set state(value: SelectionState) {
		this._state = value;
	}

	onClick() {
		if (this.state === 'unchecked' || this.state === 'selectedPartial') {
			this.state = 'selectedAll';
		} else {
			this.state = 'unchecked';
		}
		this.update.emit(this.state);
		this.emit();
	}

	private emit() {
		if (this.state === 'unchecked') {
			this.uncheck.emit();
		} else if (this.state === 'selectedAll') {
			this.check.emit();
		}
	}

	uncheckedStyle() {
		const unWidth = this.size - 1;
		const unHeight = this.size - 1;

		return {
			width: `${unWidth}px`,
			height: `${unHeight}px`,
			border: `1px solid var(--color-secondary)`,
			background: `var(--color-secondary-light)`,
			'border-radius': `2px`
		};
	}

	iconSize() {
		return {
			'height': `${this.size}px`,
			'width': `${this.size}px`
		};
	}
}
