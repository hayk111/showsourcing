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

	private _selectedCompanyId$ = new ReplaySubject<string>(1);
	selectedCompanyId$ = this._selectedCompanyId$.asObservable();

	private _selectedCompany$ = new ReplaySubject<Company>(1);
	selectedCompany$ = this._selectedCompany$.asObservable().pipe(
		shareReplay(1),
	);

	hasCompanySelected$ = this.selectedCompany$.pipe(
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
		this.restoreSelectedCompanyId();

		// 2. When we have companys we find out what the selected company is
		combineLatest(
			this.selectedCompanyId$,
			this.selectAll(),
			(id, companies) => this.getSelectedCompany(id, companies)
		).subscribe(this._selectedCompany$);

		// when logging out let's clear the current selected company
		this.authSrv.authStatus$.subscribe(status => {
			if (status === AuthStatus.NOT_AUTHENTICATED) {
				this.resetSelectedCompany();
			}
		});

		this.selectedCompany$.subscribe(company => this.companySync = company);
	}

	/** creates and picks it */
	create(company: Company): Observable<any> {
		return super.create(company).pipe(
			switchMap(_ => this.pickCompany(company))
		);
	}

	/** picks a company, puts the selection in local storage */
	pickCompany(company: Company): Observable<Company> {
		this.storage.setItem(SELECTED_COMPANY_ID, company.id);
		this._selectedCompanyId$.next(company.id);

		return this.hasCompanySelected$.pipe(
			filter(has => has),
			switchMapTo(this.selectedCompany$)
		);
	}

	/** restore from local storage   */
	private restoreSelectedCompanyId() {
		const selectedCompanyId: string = this.storage.getItem(SELECTED_COMPANY_ID);
		this._selectedCompanyId$.next(selectedCompanyId);
	}

	private getSelectedCompany(selectedId: string, companies: Company[]) {
		return selectedId ? companies.find(company => company.id === selectedId) : undefined;
	}

	private resetSelectedCompany() {
		this.storage.remove(SELECTED_COMPANY_ID);
		this._selectedCompanyId$.next(undefined);
	}
}
