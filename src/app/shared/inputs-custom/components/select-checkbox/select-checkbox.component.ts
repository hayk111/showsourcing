import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives/abstract-input.class';
import { SelectionService } from '~core/list-page';

type CheckboxState = 'selectedPartial' | 'unchecked' | 'selectedAll';

@Component({
	selector: 'select-checkbox-app',
	templateUrl: './select-checkbox.component.html',
	styleUrls: ['./select-checkbox.component.scss']
})
export class SelectCheckboxComponent implements OnInit {
	@Input() boxColor = 'primary';
	@Input() size = 16;
	@Output() update = new EventEmitter<CheckboxState>();
	@Output() check = new EventEmitter<null>();
	@Output() uncheck = new EventEmitter<null>();

	private _state: CheckboxState;

	@Input()
	get state(): CheckboxState { return this._state; }
	set state(value: CheckboxState) {
		this._state = value;
	}

	constructor(private selectionSrv: SelectionService) {	}

	ngOnInit() {
		this.selectionSrv.getSelectionState().subscribe(state => {
			this._state = state;
		});
	}

	onClick(value) {
		this.update.emit(value);
		this.emit();
	}

	focusClick() {
		console.log('focuse click');
	}

	private emit() {
		if (this.state === 'unchecked') {
			this.check.emit();
		} else if (this.state === 'selectedAll') {
			this.uncheck.emit();
		}
	}

	iconSize() {
		return {
			'height': `${this.size}px`,
			'width': `${this.size}px`
		};
	}
}
