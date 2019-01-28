import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SelectorConstComponent } from '~deprecated/selector-const/selector-const.component';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';

import { OnBoardingService } from '../../services';

@Component({
	selector: 'business-type-app',
	templateUrl: './business-type.component.html',
	styleUrls: ['./business-type.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessTypeComponent extends AutoUnsub implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;
	@ViewChild('selector') selector: SelectorConstComponent;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private onBoardSrv: OnBoardingService) { super(); }

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			businessType: [''],
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.onBoardSrv.getClaim());
		this.form.valueChanges.pipe(
			takeUntil(this._destroy$),
			switchMap(claim => this.onBoardSrv.updateClaim(claim))
		).subscribe();
	}

	change(type: string) {
		this.form.get('businessType').setValue(type);
	}

	previousPage() {
		this.router.navigate(['address']);
	}

	nextPage() {
		this.router.navigate(['category']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}

}
