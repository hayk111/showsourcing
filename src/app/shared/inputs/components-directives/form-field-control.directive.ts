import { Directive, Input, ElementRef, Self, Optional, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';



@Directive({
	selector: '[formFieldCtrl]',
})
export class FormFieldControlDirective implements OnChanges {
	/**
   * Inform parents of state change
   */
	public readonly stateChanges: Subject<void> = new Subject<void>();

	constructor(@Optional() @Self() public control: NgControl) { }

	ngOnChanges() {
		this.stateChanges.next();
	}

}
