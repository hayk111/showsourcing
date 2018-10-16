import { ChangeDetectionStrategy, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchFeatureService } from '~features/on-boarding/services/search-feature.service';
import { Supplier } from '~models';
import {
	SearchAutocompleteComponent,
} from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { SearchBarComponent } from '~shared/search-bar-animated/components/search-bar/search-bar.component';
import { AutoUnsub } from '~utils';
import { AuthenticationService } from '~features/auth/services/authentication.service';

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
		private searchSrv: SearchFeatureService,
		private render: Renderer2,
		private authSrv: AuthenticationService
	) {
		super();
	}

	ngOnInit() {
		this.render.setStyle(this.searchBar.inputRef.nativeElement, 'font-size', 'var(--font-size-l)');
	}

	triggerSearch(search: string) {
		this.searchResults$ = this.searchSrv.search(search);
		this.searchAutocomplete.openAutocomplete();
	}

	toggleFocus(f: boolean) {
		this.focus = f;
	}

	supplierSubtitle(supplier: Supplier) {
		return (supplier.country) ?
			'Supplier - ' + supplier.country :
			'Supplier';
	}

	itemSelected(supplier: Supplier) {
		// update with the service on top
	}

	nextPage() {
		this.router.navigate(['supplier', 'address']);
	}

}
