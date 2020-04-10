import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorComponent } from '~shared/inputs/components-directives/error/error.component';
import { FormFieldControlDirective } from '~shared/inputs/components-directives/form-field-control.directive';
import { animations } from '~shared/inputs/components-directives/form-field/form-field.animations';
import { HintComponent } from '~shared/inputs/components-directives/hint/hint.component';
import { LabelComponent } from '~shared/inputs/components-directives/label/label.component';
import { InputDirective } from '../input.directive';

@Component({
	selector: 'form-field-app',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: animations,
})
export class FormFieldComponent implements AfterContentInit, OnInit {
	// whenever the * next to required field should be hidden
	@Input() showRequiredMarker: boolean;
	@ContentChild(InputDirective, { static: true }) input: InputDirective;
	@ContentChild(LabelComponent, { static: true }) label: LabelComponent;
	@ContentChild(HintComponent, { static: true }) hint: HintComponent;
	@ContentChild(ErrorComponent, { static: true }) error: ErrorComponent;


	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private translate: TranslateService
	) { }

	ngOnInit() {
		if (!this.input) {
			throw Error('FormField must be used with an inputApp (InputDirective)');
		}
	}

	ngAfterContentInit() {
		if (!this.input) {
			return;
		}
		// Subscribe to changes in the child control state in order to update the form field UI.
		if (this.input.stateChanges) {
			this.input.stateChanges.subscribe(() => {
				this.changeDetectorRef.markForCheck();
			});
		}
		// Run change detection and update the outline if the suffix or prefix changes.
		if (this.control && this.control.valueChanges) {
			this.control.valueChanges.subscribe(() => {
				this.changeDetectorRef.markForCheck();
			});
		}
	}

	get control() {
		return this.input && this.input.control;
	}

	/** Determines if we display an hint or an error */
	get displayedMessage(): 'error' | 'hint' | 'none' {
		// an hint displays only when we are focussed
		if (this.input.focussed && this.hint)
			return 'hint';
		else if (this.input.focussed)
			return 'none';
		// if there is an error it's always the error except if it's pristine (or focussed)
		else if (this.control
			&& !this.control.valid
			&& !this.control.pristine
			&& (this.defaultErrorMsg || this.error))
			return 'error';
		else
			return 'none';
	}

	/** Whether an error-app was supplied, if so we should show it, else show default error */
	hasCustomError(): boolean {
		return !!this.error;
	}

	get defaultErrorMsg(): string {
		if (!this.control) {
			return;
		}
		switch (true) {
			case this.control.hasError('required'):
				return this.translate.instant('error.field-is-required');
			case this.control.hasError('number'):
				return this.translate.instant('error.field-should-be-a-number');
			case this.control.hasError('email'):
				return this.translate.instant('error.field-should-be-a-valid-email');
			case this.control.hasError('tel'):
				return this.translate.instant('error.field-should-be-a-valid-tel');
			case this.control.hasError('url'):
				return this.translate.instant('error.field-should-be-a-valid-url');
		}
	}

}
