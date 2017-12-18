import { Component, OnInit, Input, Injector } from '@angular/core';
import { AbstractInput } from '../../abstract-input.class';

@Component({
	selector: 'input-radio-app',
	templateUrl: './input-radio.component.html',
	styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<string>;

	constructor(protected inj: Injector) {
		super(inj);
	}

	ngOnInit() {
	}

	onChange(event) {
		debugger;
	}

}
