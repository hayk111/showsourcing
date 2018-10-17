import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputDirective } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { OnBoardingService } from '../../services';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

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
