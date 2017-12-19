import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { AbstractInput } from '../../../abstract-input.class';
import { Entity } from '../../../../../store/utils/entities.utils';

@Component({
	selector: 'input-checkbox-app',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<Entity>;
	@Input() selected: string;
	@Output() update = new EventEmitter<any>();

	constructor(protected inj: Injector) {
		super(inj);
	}

	ngOnInit() {
	}

	onChange(value) {
		debugger;
		this.update.emit(value);
	}

	check(c) {
		return c.id === this.selected;
	}

}
