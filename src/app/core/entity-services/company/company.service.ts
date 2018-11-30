import { Injectable } from '@angular/core';
import { combineLatest, ReplaySubject, Observable, of } from 'rxjs';
import { map, shareReplay, tap, filter, switchMapTo, switchMap } from 'rxjs/operators';
import { AuthStatus } from '~core/auth/interfaces';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { CompanyQueries } from '~entity-services/company/company.queries';
import { UserService } from '~entity-services/user/user.service';
import { Company } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { LocalStorageService } from '~core/local-storage';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalService } from '~entity-services/_global/global.service';


const COMPANY = 'company';

@Injectable({
	providedIn: 'root'
})
export class CompanyService extends GlobalService<Company> {

	defaultClient = Client.USER;

	// an user has only 1 company
	private _company$ = new ReplaySubject<Company>(1);
	company$ = this._company$.asObservable();

	hasCompany$ = this.company$.pipe(
		map(company => !!company)
	);

	companySync: Company;

	constructor(
		protected apolloState: ApolloStateService,
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService
	) {
		super(apolloState, CompanyQueries, 'company', 'companies');
	}

	init() {
		// when logging out let's clear the current selected company
		this.authSrv.notAuthenticated$.subscribe(_ => this.resetCompany());
		this.authSrv.authenticated$.pipe(
			switchMap(_ => this.getCompany())
		).subscribe(this._company$);
		this.company$.subscribe(id => this.companySync = id);
	}

	/** creates and picks it */
	create(company: Company): Observable<any> {
		return super.create(company).pipe(
			switchMap(_ => this.saveCompany(company))
		);
	}

	/** picks a company, puts the selection in local storage */
	saveCompany(company: Company): Observable<Company> {
		this.storage.setItem(COMPANY, company);
		this._company$.next(company);
		return this.company$.pipe(
			filter(x => !!x)
		);
	}

	/** restore from local storage   */
	private getCompany(): Observable<Company> {
		const company: Company = this.storage.getItem(COMPANY);
		if (company) {
			return of(company);
		} else {
			return this.selectAll().pipe(
				map(all => all[0])
			);
		}
	}


	private resetCompany() {
		this.storage.remove(COMPANY);
		this._company$.next(undefined);
	}
}
