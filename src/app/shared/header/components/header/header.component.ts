import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, zip, of } from 'rxjs';
import { takeUntil, debounceTime, first, map } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { UserService, TeamService, ProductService, SupplierService } from '~global-services';
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

	constructor(
		private cdr: ChangeDetectorRef,
		private authSrv: AuthenticationService,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
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
			if (!search) {
				return;
			}

			this.searchResults$ = zip(
				this.productSrv.selectMany(
					of(new SelectParams({ query: `name CONTAINS "${search}"` }))
				).pipe(first()),
				this.supplierSrv.selectMany(
					of(new SelectParams({ query: `name CONTAINS "${search}"` }))
				).pipe(first()),
			).pipe(
				map(results => {
					const [ products, suppliers ] = results;
					const elements = [];
					elements.push(...products.map(product => Object.assign({}, product, { type: 'product' })));
					elements.push(...suppliers.map(supplier => Object.assign({}, supplier, { type: 'supplier' })));
					return elements;
				})
			);

			this.searchAutocomplete.openAutocomplete();
			this.cdr.detectChanges();
		});
	}

	logout() {
		this.authSrv.logout();
	}

	onSearchBarStateChanged(state) {
		if (state === 'shrinked') {
			this.searchControl.setValue('');
		}
	}

	supplierSubtitle(supplier) {
		return (supplier.country) ?
			supplier.type + ' - ' + supplier.country :
			supplier.type;
	}
}
