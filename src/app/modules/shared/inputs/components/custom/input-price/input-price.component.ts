import { Injector, Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractInput } from '../../../abstract-input.class';


@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputPriceComponent),
			multi: true
		}
	]
})
export class InputPriceComponent extends AbstractInput {
	@Output() update = new EventEmitter<any>();
	constructor(protected inj: Injector, private fb: FormBuilder) {
		super(inj);

	}

	onUpdate(value) {
	}
}
