import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/** Same as divider.component but with special margins */
@Component({
	selector: 'search-autocomplete-divider-app',
	templateUrl: './search-autocomplete-divider.component.html',
	styleUrls: ['./search-autocomplete-divider.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchAutocompleteDividerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
