import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { User } from '~models/user.model';
import { AutoUnsub } from '~utils';
import { Team } from '~models';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';

import { UserService } from '~global-services';
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
	searchResults = [ ];

	constructor(
		private cdr: ChangeDetectorRef,
		private authSrv: AuthenticationService,
		private userSrv: UserService,
		private teamPickerSrv: TeamPickerService) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamPickerSrv.selectedTeam$;

		this.searchControl.valueChanges.pipe(
			takeUntil(this._destroy$),
			debounceTime(500)
		).subscribe(search => {
			this.searchAutocomplete.openAutocomplete();
			this.cdr.detectChanges();
		});
	}

	logout() {
		this.authSrv.logout();
	}
}
