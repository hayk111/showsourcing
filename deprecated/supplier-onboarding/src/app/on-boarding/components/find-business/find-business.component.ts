import { ChangeDetectionStrategy, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supplier } from '~models';
import {
	SearchAutocompleteComponent,
} from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { SearchBarComponent } from '~shared/search-bar-animated/components/search-bar/search-bar.component';
import { AutoUnsub } from '~utils';
import { OnBoardingService } from '../../services';

@Component({
	selector: 'find-business-app',
	templateUrl: './find-business.component.html',
	styleUrls: ['./find-business.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindBusinessComponent extends AutoUnsub implements OnInit {

	@ViewChild('searchAutocomplete') searchAutocomplete: SearchAutocompleteComponent;
	@ViewChild('searchBar') searchBar: SearchBarComponent;

	searchResults$: Observable<Supplier[]>;
	focus = true;


	constructor(
		private router: Router,
		private onboardingSrv: OnBoardingService,
		private render: Renderer2) {
		super();
	}

	ngOnInit() {
		this.render.setStyle(this.searchBar.inputRef.nativeElement, 'font-size', 'var(--font-size-l)');
		this.searchBar.value = this.onboardingSrv.getClaim().name || '';
	}

	triggerSearch(search: string) {
		this.searchResults$ = this.onboardingSrv.searchSuppliers(search);
		this.searchAutocomplete.openAutocomplete();
	}

	toggleFocus(f: boolean) {
		this.focus = f;
	}

	createSupplier() {
		const name = this.searchBar.inputRef.nativeElement.value;
		this.onboardingSrv.updateClaim({ name });
		this.unfocusSearch(name || '');
	}

	supplierSubtitle(supplier) {
		return (supplier.countryCode) ?
			'Supplier - ' + supplier.countryCode :
			'Supplier';
	}

	itemSelected(supplier) {
		this.onboardingSrv
			.updateClaim({
				globalSupplierId: supplier.id,
				name: supplier.name,
				country: supplier.countryCode,
				street: supplier.addressFull,
				website: supplier.website,
				city: supplier.city,
				accountEmail: supplier.emailAddress,
				contactEmail: supplier.emailAddress,
				accountPhone: supplier.phone,
				contactPhone: supplier.phone,
				description: supplier.description
			}).subscribe();
		this.unfocusSearch(supplier.name || '');
	}

	unfocusSearch(name: string) {
		this.searchBar.inputRef.nativeElement.value = name;
		this.toggleFocus(false);
		this.searchAutocomplete.closeAutocomplete();
	}

	nextPage() {
		this.router.navigate(['address']);
	}

}
