import {
	Component, OnInit, ChangeDetectionStrategy, Input, HostListener, ContentChild,
	ChangeDetectorRef, AfterContentInit
} from '@angular/core';
import { InputDirective } from '~shared/inputs/components-directives/input.directive';
import { startWith } from 'rxjs/operators';
import { animations } from '~shared/inputs/components-directives/form-field/form-field.animations';
import { ErrorComponent } from '~shared/inputs/components-directives/error/error.component';
import { LabelComponent } from '~shared/inputs/components-directives/label/label.component';
import { HintComponent } from '~shared/inputs/components-directives/hint/hint.component';
import { FormControlDirective } from '@angular/forms';
import { FormFieldControlDirective } from '~shared/inputs/components-directives/form-field-control.directive';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'form-field-app',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: animations,
})
export class FormFieldComponent implements OnInit, AfterContentInit {
	// whenever the * next to required field should be hidden
	@Input() hideRequiredMarker: boolean;
	@ContentChild(FormFieldControlDirective, { static: true }) input: FormFieldControlDirective;
	@ContentChild(LabelComponent, { static: true }) label: LabelComponent;
	@ContentChild(HintComponent, { static: true }) hint: HintComponent;
	@ContentChild(ErrorComponent, { static: true }) error: ErrorComponent;


	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private translate: TranslateService
	) { }

	ngOnInit() {
		if (!this.input)
			throw Error('FormField should have an input in it with the directive formFieldCtrl');
	}

	ngAfterContentInit() {
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
		return this.input.control;
	}

	/** Determines if we display an hint or an error */
	get displayedMessage(): 'error' | 'hint' | 'none' {
		// an hint displays only when we are focussed
		// InputApp which extends formControl has focussed state
		if ((this.input as any).focussed && this.hint)
			return 'hint';
		else if ((this.input as any).focussed)
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
