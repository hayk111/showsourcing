import {
	Component, OnInit, ChangeDetectionStrategy, Input, HostListener, ContentChild,
	ChangeDetectorRef, AfterContentInit
} from '@angular/core';
import { InputDirective } from '../input.directive';
import { LabelDirective } from '../label.directive';
import { startWith } from 'rxjs/operators';
import { HintDirective } from '~shared/inputs/components-directives/hint.directive';
import { animations } from './form-field.animations';
import { ErrorComponent } from '~shared/inputs/components-directives/error/error.component';

@Component({
	selector: 'form-field-app',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: animations
})
export class FormFieldComponent implements OnInit, AfterContentInit {
	// whenever the * next to required field should be hidden
	@Input() hideRequiredMarker: boolean;
	@ContentChild(InputDirective) input: InputDirective;
	@ContentChild(LabelDirective) label: LabelDirective;
	@ContentChild(HintDirective) hint: HintDirective;
	@ContentChild(ErrorComponent) error: ErrorComponent;


	constructor(private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		if (!this.input)
			throw Error('FormField should have an input in it with the directive inputApp');
	}

	ngAfterContentInit() {
		// Subscribe to changes in the child control state in order to update the form field UI.
		this.input.stateChanges.subscribe(() => {
			this.changeDetectorRef.markForCheck();
		});

		if (this.control && this.control.valueChanges) {
			this.control.valueChanges.subscribe(() => {
				this.changeDetectorRef.markForCheck();
			});
		}
	}

	get control() {
		return this.input.control;
	}

	/** Determines if we display an hint or an error */
	get displayedMessage(): 'error' | 'hint' | 'none' {
		if (this.control && !this.control.valid && !this.input.pristine && (this.defaultErrorMsg || this.error))
			return 'error';
		else if (this.input.focussed && this.hint)
			return 'hint';
		else
			return 'none';
	}

	/** Whether an error-app was supplied, if so we should show it, else show default error */
	hasCustomError(): boolean {
		return !!this.error;
	}

	get defaultErrorMsg(): string {
		switch (true) {
			case this.control.hasError('required'):
				return 'This field is required';
			case this.control.hasError('number'):
				return 'This field should be a number';
			case this.control.hasError('email'):
				return 'This field should be a valid email';
			case this.control.hasError('tel'):
				return 'This field should be a valid telephone number';
			case this.control.hasError('url'):
				return 'This field should be a valid url';
		}
	}

}
