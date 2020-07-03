import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { api, Company, state, client } from 'showsourcing-api-lib';
import { LocalStorageService } from '~core/local-storage';
import { AuthenticationService } from './authentication.service';


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
				switchMap(_ => state.isUsable$),
				filter(usable => !!usable),
				switchMap(id => api.Company.getFirst()),
				take(1)
			)
			.subscribe(company => {
				this._company$.next(company);
			});
		this.company$.subscribe(company => {
			this.companySync = company;
			client.initCompany(company);
		});
	}

	create(company: Company) {
		return api.Company.create(company).pipe(
			tap(_company => {
				this._company$.next(_company);
			}),
		);
	}
}
