import { eventActions } from '~events/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '~app/features/user';
import { projectActions } from '~projects/store/project.actions';
import {
	categoryActions,
	countryActions,
	currencyActions,
	customFieldsActions,
	tagActions,
	teamActions,
	teamMembersActions,
	incoTermsActions,
	harbourActions,
	taskTypeActions,
	taskStatusActions,
	supplierStatusActions,
	productStatusActions,
} from '~store/action';
import { supplierActions } from '~app/features/suppliers/store//supplier.action';

@Injectable()
export class PreloaderService {
	constructor(private http: HttpClient, private store: Store<any>, private userSrv: UserService) {}

	init() {
		// loading all base entities when the user is received
		this.userSrv.user$.subscribe(user => {
			this.baseLoad();
		});
	}

	private loadMaxCounter(id) {
		return this.http.get(`api/team/${id}/maxCounter`);
	}

	baseLoad() {
		// static entities
		this.dispatch(countryActions.load());
		this.dispatch(currencyActions.load());
		this.dispatch(incoTermsActions.load());
		this.dispatch(harbourActions.load());
		this.dispatch(taskTypeActions.load());
		this.dispatch(taskStatusActions.load());
		this.dispatch(supplierStatusActions.load());
		this.dispatch(productStatusActions.load());
		// user entities
		this.dispatch(teamActions.load());
		// team entities
		this.dispatch(categoryActions.load());
		this.dispatch(customFieldsActions.load());
		this.dispatch(supplierActions.load());
		this.dispatch(eventActions.load());
		this.dispatch(projectActions.load());
		this.dispatch(tagActions.load());
		this.dispatch(teamMembersActions.load());
	}

	private dispatch(any: any) {
		this.store.dispatch(any);
	}
}
