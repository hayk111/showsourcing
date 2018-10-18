import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { InputDirective, phoneValidator } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { OnBoardingService } from '../../services';
import { takeUntil, switchMap } from 'rxjs/operators';
@Component({
	selector: 'account-creation-app',
	templateUrl: './account-creation.component.html',
	styleUrls: ['./account-creation.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCreationComponent extends AutoUnsub implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private onBoardSrv: OnBoardingService) {
		super();
		this.form = new FormGroup(this.fb.group({
			accountEmail: ['', Validators.compose([Validators.required, Validators.email])],
			firstName: [''],
			lastName: [''],
			accountPhone: ['', phoneValidator],
			password: ['', Validators.required]
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.onBoardSrv.getClaim());
		this.form.valueChanges.pipe(
			takeUntil(this._destroy$),
			switchMap(claim => this.onBoardSrv.updateClaim(claim))
		).subscribe();
	}


	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['contact-details']);
	}

	nextPage() {
		this.router.navigate(['proof-of-identity']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
