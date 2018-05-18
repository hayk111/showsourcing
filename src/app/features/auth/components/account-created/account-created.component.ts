import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
	selector: 'account-created-app',
	templateUrl: './account-created.component.html',
	styleUrls: ['./account-created.component.scss']
})
export class AccountCreatedComponent implements OnInit {

	form: FormArray;

	constructor(private fb: FormBuilder,
		private router: Router) { }

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
