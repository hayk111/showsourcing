import { Component, OnInit, Input, Output, EventEmitter, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import Log from '../../../../../../utils/logger/log.class';


export interface SelectableItem {
	id: string;
	name: string;
	checked?: boolean;
}


@Component({
	selector: 'input-checkbox-app',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
	providers: [ makeAccessorProvider(InputCheckboxComponent) ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCheckboxComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<SelectableItem>;
	// array of ids
	@Input() set selected(arr: Array<string>) {
		arr.forEach(id => {
			const c = this.choices.find(item => item.id === id);
			c.checked = true;
		});
	}
	@Output() update = new EventEmitter<any>();

	constructor(protected inj: Injector) {
		super(inj);
	}

	ngOnInit() {
	}

	onChange(value) {
		this.update.emit(value);
	}

	check(c) {
		// ok check is done multiple times here if changeDetection is not set to onpush it's
		// gonna run on every changeDetection cycle
		// however since a common scenario in the app is to pass a
		// formControl and patch it from above the input won't get its initial value
		Log.debug('if this appear a lot read comment above it');
		return c.id === this.selected;
	}

}
