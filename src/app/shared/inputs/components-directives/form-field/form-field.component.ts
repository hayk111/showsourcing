import {
	Component, OnInit, ChangeDetectionStrategy, Input, HostListener, ContentChild,
	ChangeDetectorRef, AfterContentInit
} from '@angular/core';
import { InputDirective } from '../input.directive';
import { LabelDirective } from '../label.directive';
import { startWith } from 'rxjs/operators';

@Component({
	selector: 'form-field-app',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnInit, AfterContentInit {
	// whenever the * next to required field should be hidden
	@Input() hideRequiredMarker: boolean;
	@ContentChild(InputDirective) input: InputDirective;
	@ContentChild(LabelDirective) label: LabelDirective;


	constructor(private _changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		if (!this.input)
			throw Error('FormField should have an input in it with the directive inputApp');
	}

	ngAfterContentInit() {
		if (!this.control)
			return;

		// Subscribe to changes in the child control state in order to update the form field UI.
		this.control.statusChanges.subscribe(() => {
			this._changeDetectorRef.markForCheck();
		});
	}

	get control() {
		return this.input.control;
	}

}
