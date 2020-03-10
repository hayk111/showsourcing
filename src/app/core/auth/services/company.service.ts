import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Company } from '~core/erm3/models';
import { ApiService } from '~core/erm3/services/api.service';
import { LocalStorageService } from '~core/local-storage';
import { AuthenticationService } from './authentication.service';



@Injectable({
	providedIn: 'root'
})
export class CompanyService {

	private queryAll;
	// an user has only 1 company
	private _company$ = new ReplaySubject<Company>(1);
	company$ = this._company$.asObservable();

	hasCompany$ = this.company$.pipe(
		map(company => !!company)
	);

	companySync: Company;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		protected apiSrv: ApiService
	) { }

	init() {
		// when signing in we want to load the current company of the user
		this.authSrv.signIn$.pipe(
			tap(id => {
				this.queryAll = this.apiSrv.queryBy(
					'Company',
					'Owner',
					{ variables: { byId: id } },
				);
			}),
			switchMap(_ => this.queryAll.data$),
			map(all => all[0])
		).subscribe(company => {
			this._company$.next(company);
			this.companySync = company;
		});
	}

	create(company: Company) {
		return this.apiSrv.create('Company', company)
			.pipe(
				tap(_ => this._company$.next(company)),
				switchMap(_ => this.queryAll.refetch())
			);
	}

}
