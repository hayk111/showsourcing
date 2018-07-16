import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/** component that triggers the opening of the menu */
@Component({
	selector: 'search-autocomplete-trigger-app',
	templateUrl: './search-autocomplete-trigger.component.html',
	styleUrls: ['./search-autocomplete-trigger.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'pointer'
	}
})
export class SearchAutocompleteTriggerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
