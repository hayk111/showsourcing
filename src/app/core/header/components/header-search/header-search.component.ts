import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchService } from '~core/header/services/search.service';
import {
	SearchAutocompleteComponent,
} from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'header-search-app',
	templateUrl: './header-search.component.html',
	styleUrls: ['./header-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearchComponent extends AutoUnsub implements OnInit {

	@ViewChild('searchAutocomplete', { static: true }) searchAutocomplete: SearchAutocompleteComponent;
	@ViewChild('myInput', {static: true}) myInput: ElementRef;

	searchControl: FormControl;
	searchResults$: Observable<any[]>;
	searchBarExpanded = false;
	focused = false;

	constructor(private searchSrv: SearchService) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
	}

	triggerSearch() {
		const search = this.searchControl.value;
		this.searchResults$ = this.searchSrv.search(search);
		this.searchAutocomplete.openAutocomplete();
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
