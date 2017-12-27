import { Component, OnInit, Output, EventEmitter, Injector, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
	selector: 'input-textarea-app',
	templateUrl: './input-textarea.component.html',
	styleUrls: ['./input-textarea.component.scss'],
	providers: [ makeAccessorProvider(InputTextareaComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextareaComponent extends AbstractInput implements OnInit {
	@Input() formControl: FormControl;

	constructor() {
		super();
	}

	ngOnInit() {
		super.ngOnInit();
	}


}
