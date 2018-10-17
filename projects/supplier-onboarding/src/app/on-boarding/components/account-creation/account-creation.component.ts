import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
	selector: 'account-creation-app',
	templateUrl: './account-creation.component.html',
	styleUrls: ['./account-creation.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCreationComponent implements OnInit {
	public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			firstName: [''],
			familyName: [''],
			phoneNumber: [''],
			password: ['', Validators.compose([Validators.required])]
		});
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
