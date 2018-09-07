import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'account-created-app',
	templateUrl: './account-created.component.html',
	styleUrls: ['./account-created.component.scss']
})
export class AccountCreatedComponent extends BaseComponent implements OnInit {

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
