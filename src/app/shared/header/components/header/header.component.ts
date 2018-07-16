import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, zip, of } from 'rxjs';
import { takeUntil, debounceTime, first, map, tap, filter, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { UserService, TeamService, ProductService, SupplierService, SearchService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { User } from '~models/user.model';
import { AutoUnsub } from '~utils';
import { Team } from '~models';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';

import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;

	@ViewChild('searchAutocomplete') searchAutocomplete: SearchAutocompleteComponent;

	searchControl: FormControl;
	searchResults$: Observable<any[]>;
	searchBarExpanded = false;

	constructor(
		private authSrv: AuthenticationService,
		private searchSrv: SearchService,
		private userSrv: UserService,
		private teamPickerSrv: TeamPickerService) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamPickerSrv.selectedTeam$;
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
