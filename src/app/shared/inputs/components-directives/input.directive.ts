import { Directive, ElementRef, Input, Optional, Self, OnChanges, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormFieldControlDirective } from '~shared/inputs/components-directives/form-field-control.directive';
import { Subject } from 'rxjs';
import { FocusableDirective } from './focusable.directive';

const supportedTypes = new Set([
	'color',
	'date',
	'datetime-local',
	'email',
	'month',
	'number',
	'password',
	'search',
	'tel',
	'text',
	'time',
	'url',
	'week',
]);
// TODO input directive shouldn't extend focusable and there shoud be 2 separate directives

// Native input properties that are overwritten by Angular inputs need to be synced with
// the native input element. Otherwise property bindings for those don't work.
@Directive({
	selector: '[inputApp]',
	exportAs: 'inputApp',
	host: {
		// when the host element is (focus) we set the property to focussed here
		'(focus)': 'focussed = true',
		'(blur)': 'focussed = false',
		'[attr.id]': 'id',
	},
})
export class InputDirective extends FocusableDirective implements OnChanges {
	protected static NEXT_UID = 0;
	@Input() id: string = 'inp-' + InputDirective.NEXT_UID++;
	readonly stateChanges: Subject<void> = new Subject<void>();
	/** this is here so the form field can detect if it's required and put
	 * an asterix
	 */
	@Input() required = false;

	constructor(
		protected elRef: ElementRef,
		@Optional() @Self() public control: NgControl,
	) {
		super(elRef);
	}

	ngOnChanges() {
		this.stateChanges.next();
	}

	/** Whether the input is on focus */
	set focussed(value: boolean) {
		this._focussed = value;
		this.stateChanges.next();
	}
	get focussed() {
		return this._focussed;
	}
	protected _focussed = false;

	/** Whether the has not been typed into */
	get pristine() {
		return this.control.pristine;
	}

}
