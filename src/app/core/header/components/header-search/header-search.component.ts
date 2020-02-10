import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SearchService } from '~core/header/services/search.service';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
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

	modelChange: Subject<string> = new Subject<string>();
	searchControl: FormControl;
	searchResults$: Observable<any[]>;
	searchBarExpanded = false;
	hasValueOrFocused = false;

	constructor(private searchSrv: SearchService) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.searchResults$ = this.modelChange
			.pipe(
				debounceTime(300),
				switchMap(_ => this.searchSrv.search(this.myInput.nativeElement.value)),
			);
	}

	triggerSearch() {
		this.searchAutocomplete.openAutocomplete();
		const search = this.myInput.nativeElement.value;
		this.modelChange.next(search);
	}

	supplierSubtitle(supplier) {
		return (supplier.country) ?
			supplier.type + ' - ' + supplier.country :
			supplier.type;
	}

	onFocus() {
		this.hasValueOrFocused = true;
	}

	onUnfocus() {
		const { value } = this.myInput.nativeElement;

		if (value) {
			return;
		}

		this.hasValueOrFocused = false;
	}

	onItemSelected(element) {
		// TODO: implement search box up and down moving
	}
}
