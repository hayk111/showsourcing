import { Injectable } from '@angular/core';
import { combineLatest, ReplaySubject, Observable } from 'rxjs';
import { map, shareReplay, tap, filter, switchMapTo, switchMap } from 'rxjs/operators';
import { AuthStatus } from '~features/auth/interfaces';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { CompanyQueries } from '~global-services/company/company.queries';
import { UserService } from '~global-services/user/user.service';
import { Company } from '~models';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { LocalStorageService } from '~shared/local-storage';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { GlobalService } from '~global-services/_global/global.service';


const SELECTED_COMPANY_ID = 'selected-company-id';

@Injectable({
	providedIn: 'root'
})
export class CompanyService extends GlobalService<Company> {

	defaultClient = Client.USER;

	// an user has only 1 company and we only need the id
	private _companyId$ = new ReplaySubject<string>(1);
	companyId$ = this._companyId$.asObservable();

	hasCompany$ = this.companyId$.pipe(
		map(company => !!company)
	);

	companyIdSync: string;

	constructor(
		protected apolloState: ApolloStateService,
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService
	) {
		super(apolloState, CompanyQueries, 'company', 'companies');
	}

	init() {
		this.restoreSelectedCompanyId();

		// when logging out let's clear the current selected company
		this.authSrv.authStatus$.subscribe(status => {
			if (status === AuthStatus.NOT_AUTHENTICATED) {
				this.resetSelectedCompany();
			}
		});

		this.companyId$.subscribe(id => this.companyIdSync = id);
	}

	/** creates and picks it */
	create(company: Company): Observable<any> {
		return super.create(company).pipe(
			switchMap(_ => this.pickCompany(company))
		);
	}

	/** picks a company, puts the selection in local storage */
	pickCompany(company: Company): Observable<string> {
		this.storage.setItem(SELECTED_COMPANY_ID, company.id);
		this._companyId$.next(company.id);

		return this.hasCompany$.pipe(
			filter(has => has),
			switchMapTo(this.companyId$)
		);
	}

	/** restore from local storage   */
	private restoreSelectedCompanyId() {
		const companyId: string = this.storage.getItem(SELECTED_COMPANY_ID);
		this._companyId$.next(companyId);
	}


	private resetSelectedCompany() {
		this.storage.remove(SELECTED_COMPANY_ID);
		this._companyId$.next(undefined);
	}
}
