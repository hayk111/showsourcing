import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CompanyService } from '../../../../shared/company/services/company.service';
import 'rxjs/add/operator/map';
import { CompanyContact } from '../../../../store/model/company.model';

@Component({
	selector: 'app-account-created',
	templateUrl: './account-created.component.html',
	styleUrls: ['./account-created.component.scss']
})
export class AccountCreatedComponent implements OnInit {

	form: FormArray;
	contacts$: Observable<CompanyContact>;

	constructor(private fb: FormBuilder,
							private store: Store<any>,
							private router: Router,
							private companySrv: CompanyService) { }

	ngOnInit() {
		this.form = new FormArray([]);
		// adding 3 new members from the get go.
		this.store
		.select('company')
		.map(c => c.contacts)
		.subscribe(contacts => contacts.forEach(c => this.addMore(c.email, c.name)));
	}

	addMore(email: string = '', name: string = '') {
		const group = this.fb.group({
			email: [email, Validators.compose([Validators.email, Validators.required])],
			fullName: [name]
		});
		this.form.push(group);
	}

	invite() {
		// this.companySrv.addContacts(this.form.value);
		this.router.navigate(['home']);
	}

}
