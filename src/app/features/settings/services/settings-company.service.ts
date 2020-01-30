import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService, UserService } from '~core/erm';

@Injectable({ providedIn: 'root' })
export class SettingsCompanyService {

	constructor(
		protected companySrv: CompanyService,
		protected userSrv: UserService,
		protected http: HttpClient
	) {}

	selectCompanyOwner() {
		return zip(
			this.userSrv.selectUser(),
			this.companySrv.getCompany()
		).pipe(
			map(([user, company]) => {
				return {
					owner: (company && company.owner && company.owner.id === user.id),
					user
				};
			})
		);
	}
}
