import { Directive, Input, OnChanges, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';


/** @Deprecated */
@Directive({
	selector: '[formFieldCtrl]',
	host: {
	}
})
export class FormFieldControlDirective implements OnChanges {

	protected static NEXT_UID = 0;
	/** id of element, if not specified it will generate automtically */
	@Input() id: string = 'inp-' + FormFieldControlDirective.NEXT_UID++;

	/**
   * Inform parents of state change
   */
	public readonly stateChanges: Subject<void> = new Subject<void>();
	@Input() placeholder: string;

	constructor(@Optional() @Self() public control: NgControl) { }

	ngOnChanges() {
		this.stateChanges.next();
	}



}
