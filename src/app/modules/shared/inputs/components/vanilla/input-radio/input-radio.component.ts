import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import { SelectableItem } from '../input-checkbox/input-checkbox.component';

@Component({
	selector: 'input-radio-app',
	templateUrl: './input-radio.component.html',
	styleUrls: ['./input-radio.component.scss'],
	providers: [ makeAccessorProvider(InputRadioComponent) ]
})
export class InputRadioComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<SelectableItem>;
	@Input() selected: string;
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
