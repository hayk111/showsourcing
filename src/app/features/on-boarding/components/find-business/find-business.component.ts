import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AutoUnsub } from '~utils';
import { Router } from '@angular/router';
import { SearchFeatureService } from '~features/on-boarding/services/search-feature.service';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'apollo-link';

@Component({
	selector: 'find-business-app',
	templateUrl: './find-business.component.html',
	styleUrls: ['./find-business.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindBusinessComponent extends AutoUnsub implements OnInit {

	@ViewChild('searchAutocomplete') searchAutocomplete: SearchAutocompleteComponent;

	searchControl: FormControl;
	searchResults$: Observable<any[]>;
	searchBarExpanded = false;

	constructor(
		private router: Router,
		private searchSrv: SearchFeatureService) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
	}

	nextPage() {
		this.router.navigate(['supplier', 'address']);
	}

}
