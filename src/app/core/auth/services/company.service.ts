import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Company, EntityName } from '~core/erm/models';
import { ApiService } from '~core/erm3/services/api.service';
import { LocalStorageService } from '~core/local-storage';


const COMPANY = 'company';

@Injectable({
	providedIn: 'root'
})
export class CompanyService {

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
		return this.apiSrv.create(EntityName.COMPANY, company)
			.pipe(tap(companyResp => this.saveCompany(companyResp)));
	}

	/** picks a company, puts the selection in local storage */
	private saveCompany(company: Company) {
		this.storage.setItem(COMPANY, company);
		this._company$.next(company);
	}

	/** restore from local storage or get the first company in DB */
	getCompany(): Observable<Company> {
		const company: Company = this.storage.getItem(COMPANY);
		if (company) {
			return of(company);
		} else {
			return this.apiSrv.queryAll(EntityName.COMPANY).data$.pipe(
				map(all => all[0])
			);
		}
	}

	private resetCompany() {
		this.storage.remove(COMPANY);
		this._company$.next(undefined);
	}
}
