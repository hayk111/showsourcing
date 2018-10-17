import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputDirective } from '~shared/inputs';
import { Router } from '@angular/router';
import { countries, AutoUnsub } from '~utils';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

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
		private render: Renderer2) { super(); }

	ngOnInit() {
		this.form = this.fb.group({
			country: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: ['', Validators.required]
		});
		// this.selector.selector.ngSelect.
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
