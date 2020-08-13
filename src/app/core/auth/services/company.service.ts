import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { api, client, Company } from 'showsourcing-api-lib';
import { AuthenticationService } from './authentication.service';
import { log } from '~utils/log';
import { initializedClient$ } from '../../../../client';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	private _company$ = new ReplaySubject<Company>(1);
	company$ = this._company$.asObservable();
	companySync: Company;

	constructor(protected authSrv: AuthenticationService) {}

	init() {
		// when signing in we want to load the current company of the user
		initializedClient$
			.pipe(switchMap(id => api.Company.getFirst()))
			.subscribe(company => this._company$.next(company));
		this.company$.subscribe(company => {
			this.companySync = company;
			if (company) {
				log.debug('client init company');
				client.initCompany(company);
			}
		});
	}

	create(company: Company) {
		return api.Company.create(company).online$.pipe(tap(_company => this._company$.next(_company)));
	}
}
