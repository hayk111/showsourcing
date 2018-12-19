import { Component, OnInit, Input, EventEmitter, Output, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidator } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { takeUntil, take, catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '~entity-services';
import { AuthFormElement, AuthFormButton } from '~features/auth-pages/components/auth-form-base/auth-form';
import { TrackingComponent } from '~utils/tracking-component';

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

