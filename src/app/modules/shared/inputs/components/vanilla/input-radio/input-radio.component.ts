import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { AbstractInput } from '../../../abstract-input.class';
import { Entity } from '../../../../../store/utils/entities.utils';

@Component({
	selector: 'input-radio-app',
	templateUrl: './input-radio.component.html',
	styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<Entity>;
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
