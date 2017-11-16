import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { Company } from '../interfaces/company.interface';
import { Store } from '@ngrx/store';
import Log from '../../../../utils/logger/log.class';
import { CompanyContact } from '../interfaces/company-contact.interface';
import { CompanyActions } from '../../../store/action/company.action';

@Injectable()
export class CompanyService {

	private static STORAGE_KEY = 'COMPANY';
	private loadCalls: number;
	private company: Company;

	constructor(private storage: LocalStorageService, private store: Store<any>) {
		Log.debug('Company service creation');
		this.load();
		this.store.select('company').subscribe(c => this.company = c);
	}

	// gets the company from the local storage and
	// populates the store with the value from it.
	private load() {
		const company = this.storage.getItem<Company>(CompanyService.STORAGE_KEY);
		if (company)
			this.saveInStore(company);
	}

	save(company: Company) {
		this.saveInStore(company);
		this.saveInLocalStorage();
	}

	addContacts(contacts: Array<CompanyContact>) {
		const action = CompanyActions.addContacts(contacts);
		this.store.dispatch(action);
		this.saveInLocalStorage();
	}

	private saveInStore(company: Company) {
		const action = CompanyActions.setCompany(company);
		this.store.dispatch(action);
	}

	private saveInLocalStorage() {
		this.storage.setItem(CompanyService.STORAGE_KEY, this.company);
	}
}
