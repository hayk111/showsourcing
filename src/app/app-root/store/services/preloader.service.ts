import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	CountryActions,
	CurrencyActions,
	TeamActions,
	CategoryActions,
	SupplierActions,
	CustomFieldsActions,
	EventActions,
	ProjectActions,
	TagActions,
	TeamMembersActions,
} from '~store/action';
import { UserService } from '~app/features/user';

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

	// before doing a base load we need to make sure we have the user loaded.
	baseLoad() {
		// static entities
		// (no user actually needed for those but better to keep those here as well for consistency)
		this.dispatch(CountryActions.load());
		this.dispatch(CurrencyActions.load());
		// user entities
		this.dispatch(TeamActions.load());
		// team entities
		this.dispatch(CategoryActions.load());
		this.dispatch(CustomFieldsActions.load());

		this.dispatch(SupplierActions.load());
		this.dispatch(EventActions.load());
		this.dispatch(ProjectActions.load());
		this.dispatch(TagActions.load());
		this.dispatch(TeamMembersActions.load());
	}

	private dispatch(any: any) {
		this.store.dispatch(any);
	}
}
