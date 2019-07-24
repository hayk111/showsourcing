import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OnBoardingService } from '../../services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'business-description-app',
	templateUrl: './business-description.component.html',
	styleUrls: ['./business-description.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessDescriptionComponent extends AutoUnsub implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;


	constructor(
		private fb: FormBuilder,
		private router: Router,
		private onBoardSrv: OnBoardingService) { super(); }

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			description: ''
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.onBoardSrv.getClaim());
		this.form.valueChanges.pipe(
			takeUntil(this._destroy$),
			switchMap(claim => this.onBoardSrv.updateClaim(claim))
		).subscribe();
	}

	previousPage() {
		this.router.navigate(['category']);
	}

	nextPage() {
		this.router.navigate(['contact-details']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
