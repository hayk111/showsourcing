import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '~core/local-storage';
import { AuthenticationService } from './authentication.service';
import { api, Company } from 'showsourcing-api-lib';


@Injectable({
	providedIn: 'root'
})
export class CompanyService {
	private _company$ = new ReplaySubject<Company>(1);
	company$ = this._company$.asObservable();
	hasCompany$ = this.company$.pipe(map(company => !!company));
	companySync: Company;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
	) {}

	init() {
		// when signing in we want to load the current company of the user
		this.authSrv.signIn$
			.pipe(
				switchMap(id => api.Company.getFirst()),
			)
			.subscribe(company => {
				this._company$.next(company);
				this.companySync = company;
			});
	}

	create(company: Company) {
		return api.Company.create(company).pipe(
			tap(_company => this._company$.next(_company)),
		);
	}
}
