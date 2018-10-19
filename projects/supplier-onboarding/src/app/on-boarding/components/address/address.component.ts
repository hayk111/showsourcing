import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputDirective } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { AutoUnsub, countries } from '~utils';
import { OnBoardingService } from '../../services';
import { takeUntil, switchMap, map } from 'rxjs/operators';

@Component({
	selector: 'address-app',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent extends AutoUnsub implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;
	@ViewChild('selector') selector: SelectorConstComponent;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private onBoardSrv: OnBoardingService) { super(); }

	ngOnInit() {
		this.form = new FormGroup(this.fb.group({
			country: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: ['', Validators.required]
		}).controls, { updateOn: 'blur' });

		this.form.patchValue(this.onBoardSrv.getClaim());
		this.form.valueChanges.pipe(
			takeUntil(this._destroy$),
			switchMap(claim => this.onBoardSrv.updateClaim(claim))
		).subscribe();
	}

	previousPage() {
		this.router.navigate(['find-business']);
	}

	nextPage() {
		this.router.navigate(['business-type']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}

}
