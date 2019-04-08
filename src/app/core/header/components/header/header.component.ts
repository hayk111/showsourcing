import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TeamService, UserService, SupplierRequestService } from '~entity-services';
import { Team } from '~models';
import { User } from '~models/user.model';
import {
	SearchAutocompleteComponent,
} from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { AutoUnsub } from '~utils';

import { SearchService } from '../../services/search.service';


@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;
	requestCount$: Observable<number>;
	isProd = environment.production;

	@ViewChild('searchAutocomplete') searchAutocomplete: SearchAutocompleteComponent;

	searchControl: FormControl;
	searchResults$: Observable<any[]>;
	searchBarExpanded = false;

	constructor(
		private authSrv: AuthenticationService,
		private searchSrv: SearchService,
		private userSrv: UserService,
		private requestSrv: SupplierRequestService,
		private teamSrv: TeamService) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamSrv.teamSelected$;
		this.requestCount$ = this.requestSrv.queryCount('status == "replied"');
	}

	triggerSearch() {
		const search = this.searchControl.value;
		this.searchResults$ = this.searchSrv.search(search);
		this.searchAutocomplete.openAutocomplete();
	}

	logout() {
		this.authSrv.logout();
	}

	onSearchBarStateChanged(state) {
		if (state === 'shrinked') {
			this.searchControl.setValue('');
			this.searchBarExpanded = false;
		} else {
			this.searchBarExpanded = true;
		}
	}

	supplierSubtitle(supplier) {
		return (supplier.country) ?
			supplier.type + ' - ' + supplier.country :
			supplier.type;
	}
}
