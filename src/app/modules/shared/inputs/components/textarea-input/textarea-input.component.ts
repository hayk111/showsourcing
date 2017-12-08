import { Component, OnInit, Output, EventEmitter, Injector, forwardRef } from '@angular/core';
import { AbstractInput } from '../../abstract-input.class';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'textarea-input-app',
	templateUrl: './textarea-input.component.html',
	styleUrls: ['./textarea-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaInputComponent),
			multi: true
		}
	]
})
export class TextareaInputComponent extends AbstractInput implements OnInit {
	@Output() blurred = new EventEmitter<any>();

	constructor(protected inj: Injector) {
		super(inj);
 }

	ngOnInit() {
		super.ngOnInit();
	}

	onBlur() {
		this.blurred.emit(this.value);
	}
}
