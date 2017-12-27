import { Injector, Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';


@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	providers: [ makeAccessorProvider(InputPriceComponent) ]
})
export class InputPriceComponent extends AbstractInput {
	@Output() update = new EventEmitter<any>();
	constructor() {
		super();

	}

	onUpdate(value) {
	}
}
