import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { Company } from '~core/erm/models';
import { CompanyQueries } from '~core/erm/services/company/company.queries';
import { GlobalService } from '~core/erm2/global.service-2';
import { LocalStorageService } from '~core/local-storage';
import { customQueries } from './company.custom-queries';


const COMPANY = 'company';

@Injectable({
	providedIn: 'root'
})
export class CompanyService extends GlobalService<Company> {

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
	) {
		super(CompanyQueries, 'company', customQueries);
	}

	init() {
		// when logging out let's clear the current selected company
		this.authSrv.signOut$.subscribe(_ => this.resetCompany());
		this.authSrv.signIn$.pipe(
			switchMap(_ => this.getCompany())
		).subscribe(company => {
			this._company$.next(company);
			this.companySync = company;
		});
	}

	create(company: Company) {
		return super.create((company)).pipe(
			switchMap(companyResp => this.saveCompany(companyResp))
		);
	}

	/** picks a company, puts the selection in local storage */
	private saveCompany(company: Company): Observable<Company> {
		this.storage.setItem(COMPANY, company);
		this._company$.next(company);
		return this.company$.pipe(
			filter(x => !!x)
		);
	}

	/** restore from local storage or get the first company in DB */
	getCompany(): Observable<Company> {
		const company: Company = this.storage.getItem(COMPANY);
		if (company) {
			return of(company);
		} else {
			return this.queryAll().pipe(
				map(all => all[0])
			);
		}
	}


	private resetCompany() {
		this.storage.remove(COMPANY);
		this._company$.next(undefined);
	}
}
