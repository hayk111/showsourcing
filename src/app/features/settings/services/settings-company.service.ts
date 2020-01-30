import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { CompanyService, UserService } from '~core/erm/services';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SettingsCompanyService {

	constructor(
		protected apolloState: ApolloStateService,
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
