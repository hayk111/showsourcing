import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'searchable-list-app',
	templateUrl: './searchable-list.component.html',
	styleUrls: ['./searchable-list.component.scss']
})
export class SearchableListComponent implements OnInit {
	searchString = new FormControl('');
	@Output() search = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	onKeyUp() {
		this.search.emit(this.searchString.value);
	}

}
