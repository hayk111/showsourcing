import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, takeUntil, switchMap } from 'rxjs/operators';
import { CompanyService, UserService, TeamUserService } from '~core/ORM/services';
import { SettingsCompanyService } from '~features/settings/services/settings-company.service';
import { ERM, Company } from '~core/ORM/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'info-page-app',
	templateUrl: './info-page.component.html',
	styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent extends AutoUnsub implements OnInit {
	erm = ERM;
	company: Company;
	company$: Observable<Company>;
	companyOwner: boolean;

	constructor(
		private companySrv: CompanyService,
		private featureSrv: SettingsCompanyService
	) {
		super();
	}

	ngOnInit() {
		this.company$ = this.companySrv.getCompany();
		this.company = this.companySrv.companySync;

		this.featureSrv.selectCompanyOwner().pipe(
			takeUntil(this._destroy$)
		).subscribe(({ user, owner }) => {
			this.companyOwner = owner;
		});
	}

	updateCompany({ name }) {
		if (name.length) {
			this.company$.pipe(
				take(1),
				switchMap((company: Company) => this.companySrv.update({
					id: company.id,
					name
				}))
			).subscribe();
		}
	}
}
