import { Component, OnInit } from '@angular/core';
import { FORM_DESCRIPTOR } from '../info-request-form/form-descriptor';
import { FormGroup } from '@angular/forms';
import { CompanyService } from '../../../../shared/company/services/company.service';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../../../store/model/company.model';

@Component({
	selector: 'info-request-validation-app',
	templateUrl: './info-request-validation.component.html',
	styleUrls: ['./info-request-validation.component.scss']
})
export class InfoRequestValidationComponent extends AutoUnsub implements OnInit {
	descriptor = FORM_DESCRIPTOR;
	company$: Observable<Company>;

	constructor(private companySrv: CompanyService, private store: Store<any>, private router: Router) {
		super();

	}

	ngOnInit() {
		this.company$ = this.store.select('company')
			.takeUntil(this._destroy$);
	}

	goToNextPage() {
		this.router.navigate(['guest', 'info-request', 'thanks']);
	}
}
