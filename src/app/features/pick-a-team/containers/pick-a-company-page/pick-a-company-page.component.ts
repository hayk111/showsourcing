import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Company } from '~models';
import { CompanyService } from '~global-services';
import { switchMap, tap } from 'rxjs/operators';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';


@Component({
	selector: 'pick-a-company-page-app',
	templateUrl: './pick-a-company-page.component.html',
	styleUrls: [
		'./pick-a-company-page.component.scss',
		'../../../auth/components/form-style.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickACompanyPageComponent extends TrackingComponent implements OnInit {
	companys$: Observable<Company[]>;
	pending$ = new BehaviorSubject<boolean>(false);
	form: FormGroup;
	private returnUrl: string;

	constructor(private companySrv: CompanyService, private router: Router, private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
		this.companys$ = this.companySrv.selectAll();
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

	}

	pickCompany(company: Company) {
		this.pending$.next(true);
		this.companySrv.pickCompany(company)
			.subscribe(_ => this.router.navigateByUrl(this.returnUrl));
	}
}
