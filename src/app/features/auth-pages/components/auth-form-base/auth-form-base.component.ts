import { Component, OnInit, Input, EventEmitter, Output, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidator } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { takeUntil, take, catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '~entity-services';

@Component({
	selector: 'auth-form-app',
	templateUrl: './auth-form-base.component.html',
	styleUrls: ['./auth-form-base.component.scss', '../form-style.scss']
})
export class AuthFormBaseComponent extends AutoUnsub implements OnInit {
	@Input() pending = false;
	constructor(
	) {
		super();
	}

	ngOnInit() {
	}
}

