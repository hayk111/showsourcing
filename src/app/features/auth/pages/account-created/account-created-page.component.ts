import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'account-created-page-app',
	templateUrl: './account-created-page.component.html',
	styleUrls: ['./account-created-page.component.scss']
})
export class AccountCreatedPageComponent extends TrackingComponent implements OnInit {

	form: FormArray;

	constructor(private fb: FormBuilder,
		private router: Router) {
		super();
	}

	ngOnInit() {
		this.form = new FormArray([]);
	}

	addMore(email: string = '', name: string = '') {
		const group = this.fb.group({
			email: [email, Validators.compose([Validators.email, Validators.required])],
			fullName: [name]
		});
		this.form.push(group);
	}

	goHome() {
		this.router.navigate(['home']);
	}

}
