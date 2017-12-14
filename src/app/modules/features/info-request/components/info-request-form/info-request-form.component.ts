import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CompanyService } from '../../../../shared/company/services/company.service';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import 'rxjs/add/operator/takeUntil';
import { InfoRequestFormBuilderService } from '../../service/info-request-form-builder.service';

@Component({
	selector: 'info-request-form-app',
	templateUrl: './info-request-form.component.html',
	styleUrls: ['./info-request-form.component.scss'],
	changeDetection : ChangeDetectionStrategy.OnPush
})
export class InfoRequestFormComponent extends AutoUnsub {
	companyForm: FormGroup;

	constructor(private irfb: InfoRequestFormBuilderService, private companySrv: CompanyService, private store: Store<any>) {
		super();
		this.companyForm = this.irfb.companyForm;
	}


	addContact() {
		this.irfb.addPersonContactForm();
	}

	onSubmit() {
		const company = this.companyForm.value;
		this.companySrv.save(company);
	}

	get contacts() {
		return (this.companyForm.get('contacts') as FormArray).controls;
	}
}
