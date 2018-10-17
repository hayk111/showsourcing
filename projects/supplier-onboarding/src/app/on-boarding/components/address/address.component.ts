import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputDirective } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { AutoUnsub, countries } from '~utils';
import { OnBoardingService } from '../../services';

@Component({
	selector: 'address-app',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent extends AutoUnsub implements OnInit {

	form: FormGroup;
	countryMap = countries;
	@ViewChild(InputDirective) input: InputDirective;
	@ViewChild('selector') selector: SelectorConstComponent;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private onboardSrv: OnBoardingService) { super(); }

	ngOnInit() {
		this.form = this.fb.group({
			country: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: ['', Validators.required]
		});

		/*
		this.form.patchValue(this.onBoardSrv.claim);
		this.form.valueChanges.pipe(
			takeUntil(this._destroy$),
			switchMap(claim => this.onBoardSrv.update(claim))
		).subscribe();
		*/
	}

	change(thing) {
		console.log(thing);
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
