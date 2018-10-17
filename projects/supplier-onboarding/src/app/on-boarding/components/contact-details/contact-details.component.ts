import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InputDirective, phoneValidator } from '~shared/inputs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnBoardingService } from '../../services';
import { AutoUnsub } from '~utils';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
	selector: 'contact-details-app',
	templateUrl: './contact-details.component.html',
	styleUrls: ['./contact-details.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent extends AutoUnsub implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private onBoardSrv: OnBoardingService) { super(); }

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			contactEmail: ['', [Validators.required, Validators.email]],
			contactPhone: ['', phoneValidator],
			wechat: [''],
			whatsapp: [''],
			website: ['']
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.onBoardSrv.getClaim());
		this.form.valueChanges.pipe(
			takeUntil(this._destroy$),
			switchMap(claim => this.onBoardSrv.updateClaim(claim))
		).subscribe();
	}

	previousPage() {
		this.router.navigate(['business-description']);
	}

	nextPage() {
		this.router.navigate(['account-creation']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}


}
