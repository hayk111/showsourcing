import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputDirective } from '~shared/inputs';
import { Router } from '@angular/router';

@Component({
	selector: 'address-app',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private router: Router,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			country: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: ['', Validators.required]
		});
	}

	previousPage() {
		this.router.navigate(['supplier', 'find-business']);
	}

	nextPage() {
		this.router.navigate(['supplier', 'business-type']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}

}
