import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFormButton, AuthFormElement } from '~features/auth-pages/components/auth-form-base/auth-form';
import { AutoUnsub } from '~utils';


/**
 * This component was made by Van Huy, and I've no clue why he decided
 * to do something dynamic for something as simple as a login form.
 */
@Component({
	selector: 'auth-form-app',
	templateUrl: './auth-form-base.component.html',
	styleUrls: ['./auth-form-base.component.scss', '../form-style.scss']
})
export class AuthFormBaseComponent extends AutoUnsub implements OnInit {

	@Input() form: FormGroup;

	@Input() error = '';
	@Input() pending = false;
	@Input() defaultFocused = '';
	@Output() onSubmit = new EventEmitter<any>();

	private _listForm: AuthFormElement[] = [];

	@Input() set listForm(value: AuthFormElement[]) {
		this._listForm = value;
		const formGroup = {};
		this._listForm.forEach((element: AuthFormElement) => {
			formGroup[element.name] = ['', Validators.compose(element.validators)];
		});
		this.form = this.fb.group(formGroup);
	}
	get listForm(): AuthFormElement[] {
		return this._listForm;
	}

	@Input() buttons: AuthFormButton[] = [];

	constructor(
		private fb: FormBuilder,
	) {
		super();
	}

	ngOnInit() {
	}
}

