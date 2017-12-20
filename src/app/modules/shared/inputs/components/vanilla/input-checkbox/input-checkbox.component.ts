import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';


export interface SelectableItem {
	id: string;
	name: string;
	checked?: boolean;
}


@Component({
	selector: 'input-checkbox-app',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
	providers: [ makeAccessorProvider(InputCheckboxComponent) ]
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
		return c.id === this.selected;
	}

}
