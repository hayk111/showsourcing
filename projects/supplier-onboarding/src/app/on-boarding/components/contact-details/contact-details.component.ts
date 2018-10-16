import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InputDirective } from '~shared/inputs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'contact-details-app',
	templateUrl: './contact-details.component.html',
	styleUrls: ['./contact-details.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private router: Router,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			contactEmail: ['', [Validators.required, Validators.email]],
			contactPhone: ['', Validators.required],
			wechat: [''],
			whatsapp: [''],
			website: ['']
		});
	}

	previousPage() {
		this.router.navigate(['supplier', 'business-description']);
	}

	nextPage() {
		this.router.navigate(['supplier', 'account-creation']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}


}
